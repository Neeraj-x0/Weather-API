import axios from "axios";
import { Request, Response, Router } from "express";
import redisClient from "../configs/redis";
import { CoordinateType } from "../types";

const weatherRouter: Router = Router();

weatherRouter.get(
  "/",
  async (req: Request<{}, {}, {}, CoordinateType>, res: Response) => {
    const { lon, lat }: CoordinateType = req.query;

    if (!lon || !lat) {
      return res.status(400).send({ error: "Coordinates are missing!" });
    }

    const cachedData = await redisClient.get(`weather:lon=${lon},lat=${lat}`);

    if (cachedData) {
      console.log("cachedData")
      return res.json({ ...JSON.parse(cachedData), isCache: true });
    
    }

    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    redisClient.set(
      `weather:lon=${lon},lat=${lat}`,
      JSON.stringify(weather.data),
      {
        EX: 6 * 60 * 60,
        NX: true,
      }
    );

    return res.json({ ...weather.data, isCache: false });
  }
);

export default weatherRouter;
