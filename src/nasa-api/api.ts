import axios from "axios";
import calculateSol from "../helpers/solCalculation";
import getQueryParams from "../helpers/getQueryParams";
import validateRoverOrThrow from "../helpers/validateRoverName";
require("dotenv").config();

const { API_KEY } = process.env;

const ROVERS_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";

interface RoverI {
  name: string;
  max_sol: number;
  cameras: { name: string }[];
}

interface RoversI {
  rovers: Array<RoverI>;
}

interface PhotoI {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export default class API {
  static getAllRoversData() {
    const url = `${ROVERS_URL}?api_key=${API_KEY}`;
    return axios.get<RoversI>(url).then((response) => response.data.rovers);
  }

  static getRoverNamesList() {
    return API.getAllRoversData().then(
      (roverDataList) =>
        roverDataList && roverDataList.map((rover) => rover.name)
    );
  }

  static getRoverData(roverName: string): Promise<RoverI> {
    validateRoverOrThrow(roverName);
    const url = `${ROVERS_URL}/${roverName}?api_key=${API_KEY}`;
    return axios.get(url).then((response) => response.data.rover);
  }

  static getRoverPhotos(roverName: string, camera?: string, sol?: number): Promise<PhotoI[]> {
    const url = `${ROVERS_URL}/${roverName}/photos?api_key=${API_KEY}`;
    return API.getRoverData(roverName).then(({ max_sol }) => {
      const day = calculateSol(sol, max_sol);

      let urlFull = url + getQueryParams({ sol: day, camera });

      return axios.get(urlFull).then((response) => response.data.photos);
    });
  }

  static getRoverCameras(roverName: string): Promise<string[]> {
    return API.getRoverData(roverName).then((roverInfo) =>
      roverInfo.cameras.map((camera) => camera.name)
    );
  }
}
