import * as googleMaps from "@google/maps";

import accessEnv from "config/accessEnv";

const googleMapClient = googleMaps.createClient({
  Promise: Promise,
  key: accessEnv("API_SECRET"),
  language: accessEnv("API_LANGUAGE", "en"),
});

export const lookupCountry = (lat: string | number, long: string | number): any => {
  return googleMapClient
    .reverseGeocode({
      result_type: "country",
      latlng: `${lat}, ${long}`,
    })
    .asPromise()
    .then(response => {
      if (response.json.status != "OK") {
        throw new Error("Something went wrong");
      }
      return response.json.results[0].formatted_address;
    })
    .catch(error => {
      return error;
    });
};

export const lookupTimeZone = (lat: string | number, long: string | number): any => {
  return googleMapClient
    .timezone({
      location: `${lat}, ${long}`,
    })
    .asPromise()
    .then(response => {
      if (response.json.status != "OK") {
        throw new Error("Something went wrong");
      }
      return `GMT${response.json.rawOffset > 0 ? "+" : "-"}${(response.json.rawOffset / 3600).toFixed(1)}`;
    })
    .catch(error => {
      return error;
    });
};

export const lookupDistanceMatrix = (start: any, end: any, unit: "metric" | "imperial"): any => {
  return googleMapClient
    .distanceMatrix({
      origins: [{ latitude: start.lat, longitude: start.long }],
      destinations: [{ latitude: end.lat, longitude: end.long }],
      units: unit,
    })
    .asPromise()
    .then(response => {
      if (response.json.status != "OK") {
        throw new Error("Something went wrong");
      }
      if (response.json.rows[0].elements[0].status != "OK") {
        throw new Error("Something went wrong");
      }
      const { distance, duration } = response.json.rows[0].elements[0];
      const { value: distanceValue } = distance;
      const { value: durationValue } = duration;
      return {
        distance: {
          value: unit === "metric" ? distanceValue / 1000 : distanceValue / 5280,
          units: unit === "metric" ? "km" : "miles",
        },
        time_diff: {
          value: parseFloat((durationValue / (60 * 60)).toFixed(1)),
          units: "hours",
        },
      };
    })
    .catch(error => {
      return error;
    });
};
