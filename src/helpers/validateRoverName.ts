import Rovers from "./roverNames";

export default function validateRoverOrThrow(roverName: string) {
  const validName = Rovers[roverName.toUpperCase()];
  if (!validName) {
    throw new Error("Invalid rover name.");
  }
}
