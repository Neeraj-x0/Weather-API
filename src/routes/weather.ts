import axios from "axios";
import { Request, Response, Router } from "express";
// ...existing code...
import { CoordinateType } from "../types";

const weatherRouter: Router = Router();

weatherRouter.get(
  "/",
  async (req: Request<{}, {}, {}, CoordinateType>, res: Response) => {
    const { lon, lat }: CoordinateType = req.query;

    if (!lon || !lat) {
      return res.status(400).send({ error: "Coordinates are missing!" });
    }

  // ...existing code...

    // Redis caching removed

    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

  // ...existing code...
    // Redis caching removed

    return res.json({ ...weather.data, isCache: false });
  }
);

export default weatherRouter;
