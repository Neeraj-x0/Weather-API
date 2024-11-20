import axios from "axios";
import { Request, Response, Router } from "express";
import redisClient from "../configs/redis";
import { QueryType } from "../types";

const locationRouter: Router = Router();

locationRouter.get(
  "/",
  async (req: Request<{}, {}, {}, QueryType>, res: Response) => {
    const { query }: QueryType = req.query;

    if (!query) {
      return res.status(400).send({ error: "Location is missing!" });
    }

    const cachedData = await redisClient.get(`location:${query}`);
    
    if (cachedData) {
      console.log("cachedData");
      return res.json({ locations: JSON.parse(cachedData), isCache: true });
    } 

    const locations = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${process.env.WEATHER_API_KEY}`
    ); 

    if (!locations?.data || locations.data.length === 0) {
      return res.json({ locations: [], isCache: false });
    }

    redisClient.set(`location:${query}`, JSON.stringify(locations.data), {
      EX: 6 * 60 * 60,
      NX: true,
    });

    return res.json({ locations: locations.data, isCache: false });
  }
);

export default locationRouter;
