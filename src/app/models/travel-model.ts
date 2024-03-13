import {Travel} from "../interfaces/travel";
import {OriginPlace} from "../interfaces/OriginPlace";
import {DestinyPlace} from "../interfaces/destinyPlace";
import {Md5} from "ts-md5";

export class TravelModel implements Travel {
    private _travelID: string;
    private _userID: string;
    private _origin?: OriginPlace;
    private _destiny?: DestinyPlace;
    private _travelStartDate?: Date;
    private _travelStartTime?: Date;
    private _travelEndDate?: Date;
    private _travelEndTime?: Date;
    private _estimatedPrice?: number;
    private _numberOfSeatsAvailable?: number;
    private _comments?: string;

    constructor(
        userID: string,
        origin?: OriginPlace,
        destiny?: DestinyPlace,
        travelStartDate?: Date,
        travelStartTime?: Date,
        travelEndDate?: Date,
        travelEndTime?: Date,
        estimatedPrice?: number,
        numberOfSeatsAvailable?: number,
        comments?: string
    ) {
        this._travelID = this.generateTravelID();
        this._userID = userID;
        this._origin = origin;
        this._destiny = destiny;
        this._travelStartDate = travelStartDate;
        this._travelStartTime = travelStartTime;
        this._travelEndDate = travelEndDate;
        this._travelEndTime = travelEndTime;
        this._estimatedPrice = estimatedPrice;
        this._numberOfSeatsAvailable = numberOfSeatsAvailable;
        this._comments = comments;
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

    get travelStartDate(): Date | undefined {
        return this._travelStartDate;
    }

    get travelStartTime(): Date | undefined {
        return this._travelStartTime;
    }

    get travelEndDate(): Date | undefined {
        return this._travelEndDate;
    }

    get travelEndTime(): Date | undefined {
        return this._travelEndTime;
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

    set travelStartDate(value: Date | undefined) {
        this._travelStartDate = value;
    }

    set travelStartTime(value: Date | undefined) {
        this._travelStartTime = value;
    }

    set travelEndDate(value: Date | undefined) {
        this._travelEndDate = value;
    }

    set travelEndTime(value: Date | undefined) {
        this._travelEndTime = value;
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
