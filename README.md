## Geo Location Service 

A restful service that provides an API to return, the country and timezone info, distance (in km or miles) and the time difference in hours, between two geo locations.

### How to install & Run

#### Setup on your own machine

Install dependencies using yarn (preferred) or npm.

Run using

```
yarn start
```

or 
```
npm start
```

#### Using Docker & Docker compose

If you have docker & docker-compose set up in your work environment, 

copy the ```.env``` variables and make adjustments to ```API_SECRET``` with your own google maps api key.
 
```
cp .env.dist .env
```

```
docker-compose up -d
```

### Testing API

#### Request Format 

Request - 

	URL: http://localhost:3000/api/get_distance_and_time

	Type: POST  

	Payload: JSON
	  {
   		start: { lat: 6.927079, lng: 79.861244 },
   		end: { lat: 28.704060, lng: 77.102493 },
   		units: "metric"
   	}

You can test the API using curl, postman or similar tool.

```
curl -d '{"start": { "lat": 6.927079, "long": 79.861244 }, "end": { "lat": 28.704060, "long": 77.102493 }, "units": "metric"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/get_distance_and_time
