import express from "express";
import roverRouter from "./routers/roverRouter"

const app = express();
const port = 8000;

app.use(express.json());

app.use("/rovers", roverRouter);

app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});
