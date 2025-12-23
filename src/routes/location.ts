import axios from "axios";
import { Request, Response, Router } from "express";
// ...existing code...
import { QueryType } from "../types";

const locationRouter: Router = Router();

locationRouter.get(
  "/",
  async (req: Request<{}, {}, {}, QueryType>, res: Response) => {
    const { query }: QueryType = req.query;

    if (!query) {
      return res.status(400).send({ error: "Location is missing!" });
    }

  // ...existing code...
    
    // Redis caching removed

    const locations = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${process.env.WEATHER_API_KEY}`
    ); 

    if (!locations?.data || locations.data.length === 0) {
      return res.json({ locations: [], isCache: false });
    }

  // ...existing code...
    // Redis caching removed

    return res.json({ locations: locations.data, isCache: false });
  }
);

export default locationRouter;
