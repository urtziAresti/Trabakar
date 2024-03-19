import {Coordinates} from "./Coordinates";

export interface OriginPlace {
  name?: string,
  address?: string;
  townName?: string,
  originPlaceComments?: string;
  originPostalCode?: string;
  departureTime?: string;
  originCoords?: Coordinates;
}
