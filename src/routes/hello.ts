import { Router, Request, Response } from "express";

const helloRouter: Router = Router();

/**
 * GET /hello
 * Returns information about the Weather-API application
 */
helloRouter.get("/", (req: Request, res: Response) => {
  res.json({
    name: "Weather-API",
    version: "1.0.0",
    description: "A simple weather app that fetches weather and location data using the OpenWeatherMap API",
    author: "Neeraj-x0",
    features: [
      "Get weather information by latitude and longitude coordinates",
      "Search for locations by query",
      "Built with Express and TypeScript",
      "RESTful API design"
    ],
    endpoints: [
      {
        path: "/weather",
        method: "GET",
        description: "Get weather information for specific coordinates",
        parameters: [
          { name: "lat", type: "number", required: true, description: "Latitude coordinate" },
          { name: "lon", type: "number", required: true, description: "Longitude coordinate" }
        ]
      },
      {
        path: "/locations",
        method: "GET",
        description: "Search for locations by name",
        parameters: [
          { name: "query", type: "string", required: true, description: "Location search query" }
        ]
      },
      {
        path: "/yourname",
        method: "GET",
        description: "Get the developer's name"
      },
      {
        path: "/hello",
        method: "GET",
        description: "Get information about this API"
      }
    ],
    usage: {
      gettingStarted: "Make HTTP GET requests to the endpoints listed above",
      example: "GET /weather?lat=37.7749&lon=-122.4194"
    },
    repository: "https://github.com/Neeraj-x0/Weather-API"
  });
});

export default helloRouter;
