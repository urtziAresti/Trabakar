import {Coordinates} from "./Coordinates";

export interface OriginPlace {
  name: string,
  originPlaceComments: string;
  originPostalCode?: number;
  departureTime: Date;
  originCoords: Coordinates;
}
