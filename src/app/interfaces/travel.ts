import {OriginPlace} from "./OriginPlace";
import {DestinyPlace} from "./destinyPlace";

export interface Travel {

  travelID: string;
  userID: string;
  origin?: OriginPlace;
  destiny?: DestinyPlace;
  travelStartDates?: Date[];
  travelStartTime?: Date;
  estimatedPrice?: number;
  numberOfSeatsAvailable?: number;
  comments?: string;
  publishDate?: Date;
}
