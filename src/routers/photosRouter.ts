import express from "express";
import API from "../nasa-api/api";

const router = express.Router();

router.get("/", (req, res) => {
  const roverName = res.locals.roverName;
  const { sol } = req.query;
  API.getRoverPhotos(roverName, undefined, Number(sol)).then((data) =>
    res.json(data)
  );
});

router.get("/:cameraType", (req, res) => {
  const { roverName } = res.locals;
  const { cameraType } = req.params;
  const { sol } = req.query;
  API.getRoverPhotos(roverName, cameraType, Number(sol)).then((data) =>
    res.json(data)
  );
});

export default router;
