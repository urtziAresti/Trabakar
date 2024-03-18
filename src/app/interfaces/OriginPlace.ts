import {Coordinates} from "./Coordinates";

export interface OriginPlace {
  name?: string,
  originPlaceComments?: string;
  originPostalCode?: string;
  departureTime?: string;
  originCoords?: Coordinates;
}
