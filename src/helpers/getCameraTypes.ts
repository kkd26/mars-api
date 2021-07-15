import Rovers from "./roverNames";

export enum CameraTypes {
  FHAZ = "FHAZ",
  RHAZ = "RHAZ",
  MAST = "MAST",
  CHEMCAM = "CHEMCAM",
  MAHLI = "MAHLI",
  MARDI = "MARDI",
  NAVCAM = "NAVCAM",
  PANCAM = "PANCAM",
  MINITES = "MINITES",
}

const roverCameras: { [key: string]: CameraTypes[] } = {
  [Rovers.CURIOSITY]: [
    CameraTypes.FHAZ,
    CameraTypes.RHAZ,
    CameraTypes.MAST,
    CameraTypes.CHEMCAM,
    CameraTypes.MAHLI,
    CameraTypes.MARDI,
    CameraTypes.NAVCAM,
  ],
  [Rovers.OPPORTUNITY]: [
    CameraTypes.FHAZ,
    CameraTypes.RHAZ,
    CameraTypes.NAVCAM,
    CameraTypes.PANCAM,
    CameraTypes.MINITES,
  ],
  [Rovers.SPIRIT]: [
    CameraTypes.FHAZ,
    CameraTypes.RHAZ,
    CameraTypes.NAVCAM,
    CameraTypes.PANCAM,
    CameraTypes.MINITES,
  ],
};

export default function getCameraTypes(roverName: string): CameraTypes[] {
  const lowerName = roverName.toLowerCase();
  const roverCameraList = roverCameras[lowerName];
  return roverCameraList || [];
}
