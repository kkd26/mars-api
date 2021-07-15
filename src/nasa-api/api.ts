import axios from "axios";
import calculateSol from "../helpers/solCalculation";
import getQueryParams from "../helpers/getQueryParams";
import getCameraTypes from "../helpers/getCameraTypes";
import validateRoverOrThrow from "../helpers/validateRoverName";
require("dotenv").config();

const { API_KEY } = process.env;

const ROVERS_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";

interface RoversI {
  rovers: Array<{ name: string }>;
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

  static getRoverData(roverName: string) {
    validateRoverOrThrow(roverName);
    const url = `${ROVERS_URL}/${roverName}?api_key=${API_KEY}`;
    return axios.get(url).then((response) => response.data.rover);
  }

  static getRoverPhotos(roverName: string, camera?: string, sol?: number) {
    validateRoverOrThrow(roverName);
    const url = `${ROVERS_URL}/${roverName}/photos?api_key=${API_KEY}`;
    return API.getRoverData(roverName).then(({ max_sol }) => {
      const day = calculateSol(sol, max_sol);

      let urlFull = url + getQueryParams({ sol: day, camera });

      return axios.get(urlFull).then((response) => response.data.photos);
    });
  }

  static getRoverCameras(roverName: string): Promise<string[]> {
    validateRoverOrThrow(roverName);
    return new Promise((res, rej) => res(getCameraTypes(roverName)));
  }
}
