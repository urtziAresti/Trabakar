import {Coordinates} from "./Coordinates";

export interface DestinyPlace {
  name: string;
  destinyPlaceComments: string;
  destinyPostalCode: string;
  expectedArrivalTime?: Date;
  destinyCoords: Coordinates;
}
