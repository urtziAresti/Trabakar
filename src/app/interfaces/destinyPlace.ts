import {Coordinates} from "./Coordinates";

export interface DestinyPlace {
  name?: string;
  address? : string;
  townName?: string;
  destinyPlaceComments?: string;
  destinyPostalCode?: string;
  expectedArrivalTime?: string;
  destinyCoords?: Coordinates;
}
