import axios from "axios";
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
    return axios
      .get(`${ROVERS_URL}/${roverName}?api_key=${API_KEY}`)
      .then((response) => response.data.rover);
  }

  static getRoverPhotos(roverName: string) {
    return axios
      .get(`${ROVERS_URL}/${roverName}/photos?api_key=${API_KEY}`)
      .then((response) => response.data.photos);
  }
}
