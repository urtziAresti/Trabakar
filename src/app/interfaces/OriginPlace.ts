import {Coordinates} from "./Coordinates";

export interface OriginPlace {
  name: string,
  originPlaceComments?: string;
  originPostalCode: string;
  departureTime?: Date;
  originCoords: Coordinates;
}
