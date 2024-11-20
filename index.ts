import express from "express";
import weatherRouter from "./src/routes/weather";
import redisClient from "./src/configs/redis";
import dotenv from "dotenv";
import locationRouter from "./src/routes/location";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/weather", weatherRouter);
app.use("/locations", locationRouter);

app.listen(PORT, () => {
  redisClient.connect();
  return console.log(`App working on Port: ${PORT}`);
});
