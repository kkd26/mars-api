import express from "express";
import roverRouter from "./routers/roverRouter";
import createError from "http-errors";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.on("error", () => {
  throw new Error("test error");
});

app.use("/rovers", roverRouter);

app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});
//
