import {OriginPlace} from "./OriginPlace";
import {DestinyPlace} from "./destinyPlace";

export interface Travel {

  travelID: string;
  userID: string;
  origin?: OriginPlace;
  destiny?: DestinyPlace;

  travelStartDate?: Date;
  travelStartTime?: Date;

  travelEndDate?: Date;
  travelEndTime?: Date;

  estimatedPrice?: number;
  numberOfSeatsAvailable?: number;
  comments?: string;

}
