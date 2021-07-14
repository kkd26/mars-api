import express from "express";
import API from "../nasa-api/api";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await API.getAllRoversData();
  res.json(data);
});

router.get("/names", async (req, res) => {
  res.send(API.getRoverNamesList());
});

router.get("/:roverName", async (req, res) => {
  const { roverName } = req.params;
  res.send(API.getRoverData(roverName));
});

router.get("/:roverName/photos", async (req, res) => {
  const { roverName } = req.params;
  res.send(API.getRoverPhotos(roverName));
});

export default router;
