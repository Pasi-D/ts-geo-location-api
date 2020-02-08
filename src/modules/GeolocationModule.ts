import { lookupCountry, lookupTimeZone, lookupDistanceMatrix } from "utils/Maps";

import { GeoCodeDTO } from "models/geolocation.dto";

class GeoLocationModule {
  public async getDistanceTime(geoCodeData: GeoCodeDTO): Promise<any> {
    const { start, end, units } = geoCodeData;
    const { lat: startLat, long: startLong } = start;
    const { lat: endLat, long: endLong } = end;
    const startCountry = await lookupCountry(startLat, startLong);
    const startTimeZone = await lookupTimeZone(startLat, startLong);
    const endCountry = await lookupCountry(endLat, endLong);
    const endTimeZone = await lookupTimeZone(endLat, endLong);
    const distanceDuration = await lookupDistanceMatrix(start, end, units);
    return {
      start: {
        country: startCountry,
        timezone: startTimeZone,
        location: { lat: startLat, long: startLong },
      },
      end: {
        country: endCountry,
        timezone: endTimeZone,
        location: { lat: endLat, long: endLong },
      },
      ...distanceDuration,
    };
  }
}

export default GeoLocationModule;
