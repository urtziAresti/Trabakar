import { Injectable } from '@angular/core';
import {Travel} from "../interfaces/travel";
import {Md5} from "ts-md5";
import {Auth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class TravelPublisherService {

  public travelData: Travel

  constructor(private auth:Auth) {
    const currentUser = this.auth.currentUser!;
    this.travelData = {travelID : this.generateTravelID(),userID :currentUser?.uid }
  }


  generateTravelID() {
    return Md5.hashStr(new Date().toString());

  }


}
