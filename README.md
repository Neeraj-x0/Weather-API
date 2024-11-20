# Weather App API Documentation

## Introduction

Welcome to the Weather App documentation! This repository contains the code for a simple weather application that retrieves weather and location information using the OpenWeatherMap API and caches the data using Redis. This documentation provides an overview of how to use and set up the application.

## Endpoints

The Weather App provides two main endpoints:

### 1. Weather Information

This endpoint allows you to retrieve weather information based on latitude and longitude coordinates.

- **Endpoint**: `/weather`
- **Method**: GET
- **Query Parameters**:
  - `lat` (required): Latitude coordinate.
  - `lon` (required): Longitude coordinate.

#### Example Request:

```http
GET /weather?lat=37.7749&lon=-122.4194
```

#### Example Response:

```json
{
  "coord": {
    "lon": -122.4194,
    "lat": 37.7749
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    }
  ],
  "temperature": {
    "current": 18.5,
    "min": 17.4,
    "max": 20.5
  },
  "isCache": false
}
```

### 2. Location Information

This endpoint allows you to retrieve location information based on a query string.

- **Endpoint**: `/location`
- **Method**: GET
- **Query Parameters**:
  - `query` (required): Location query.

#### Example Request:

```http
GET /location?query=New%20York
```

#### Example Response:

```json
{
  "locations": [
    {
      "name": "New York",
      "country": "US",
      "lat": 40.7128,
      "lon": -74.0060
    }
  ],
  "isCache": false
}
```

## Usage

To use the Weather App, you can make HTTP GET requests to the specified endpoints as described above. Make sure to provide the required query parameters.

## Caching

The Weather App implements caching using Redis to improve performance and reduce the load on the external API. Cached data is stored for a duration of 6 hours. If data is found in the cache, it will be returned with the `isCache` property set to `true` in the response.

