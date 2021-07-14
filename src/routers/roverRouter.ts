import express from "express";
import API from "../nasa-api/api";
import photosRouter from "./photosRouter";

const router = express.Router();

router.get("/", (req, res) => {
  API.getAllRoversData().then((data) => res.json(data));
});

router.get("/names", (req, res) => {
  API.getRoverNamesList().then((data) => res.json(data));
});

router.get("/:roverName", (req, res) => {
  const { roverName } = req.params;
  API.getRoverData(roverName).then((data) => res.json(data));
});

router.use(
  "/:roverName/photos",
  (req, res, next) => {
    res.locals.roverName = req.params.roverName.toLowerCase();
    next();
  },
  photosRouter
);

export default router;
