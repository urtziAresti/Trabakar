import {Travel} from "../interfaces/travel";
import {OriginPlace} from "../interfaces/OriginPlace";
import {DestinyPlace} from "../interfaces/destinyPlace";
import {Md5} from "ts-md5";

export class TravelModel implements Travel {
  private _travelID: string;
  private _userID: string;
  private _origin?: OriginPlace;
  private _destiny?: DestinyPlace;
  private _travelStartDates?: Date[];
  private _estimatedPrice?: number;
  private _numberOfSeatsAvailable?: number;
  private _comments?: string;
  private _publishDate?: Date;
  private _travelDuration?: string;

  constructor(
    userID: string,
    origin?: OriginPlace,
    destiny?: DestinyPlace,
    travelStartDates?: Date[],
    estimatedPrice?: number,
    numberOfSeatsAvailable?: number,
    comments?: string,
    publishDate?: Date,
    travelDuration?: string,
  ) {
    this._travelID = this.generateTravelID();
    this._userID = userID;
    this._origin = origin;
    this._destiny = destiny;
    this._travelStartDates = travelStartDates;
    this._estimatedPrice = estimatedPrice;
    this._numberOfSeatsAvailable = numberOfSeatsAvailable;
    this._comments = comments;
    this._publishDate = publishDate;
    this._travelDuration = travelDuration;
  }

  generateTravelID() {
    return Md5.hashStr(new Date().toString());
  }


  // Getters
  get travelID(): string {
    return this._travelID;
  }

  get userID(): string {
    return this._userID;
  }

  get origin(): OriginPlace | undefined {
    return this._origin;
  }

  get destiny(): DestinyPlace | undefined {
    return this._destiny;
  }

  get travelStartDates(): Date[] | undefined {
    return this._travelStartDates;
  }


  get publishDate(): Date | undefined {
    return this._publishDate;
  }

  get travelDuration(): string | undefined {
    return this._travelDuration;
  }


  get estimatedPrice(): number | undefined {
    return this._estimatedPrice;
  }

  get numberOfSeatsAvailable(): number | undefined {
    return this._numberOfSeatsAvailable;
  }

  get comments(): string | undefined {
    return this._comments;
  }

  // Setters
  set travelID(value: string) {
    this._travelID = value;
  }

  set userID(value: string) {
    this._userID = value;
  }

  set origin(value: OriginPlace | undefined) {
    this._origin = value;
  }

  set destiny(value: DestinyPlace | undefined) {
    this._destiny = value;
  }

  set travelStartDates(value: Date[] | undefined) {
    this._travelStartDates = value;
  }

  set publishDate(value: Date | undefined) {
    this._publishDate = value;
  }

  set TravelDuration(value: string | undefined) {
    this._travelDuration = value;
  }

  set estimatedPrice(value: number | undefined) {
    this._estimatedPrice = value;
  }

  set numberOfSeatsAvailable(value: number | undefined) {
    this._numberOfSeatsAvailable = value;
  }

  set comments(value: string | undefined) {
    this._comments = value;
  }
}
