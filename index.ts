import express from "express";
import dotenv from "dotenv";
dotenv.config();
import weatherRouter from "./src/routes/weather";
import locationRouter from "./src/routes/location";
import yourNameRouter from "./src/routes/yourname";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/weather", weatherRouter);
app.use("/locations", locationRouter);
app.use("/yourname", yourNameRouter);

app.listen(PORT, () => {
  return console.log(`App working on Port: ${PORT}`);
});
