import {Injectable} from '@angular/core';
import {TravelModel} from '../models/travel-model';
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  public travelData: TravelModel = new TravelModel('');

  constructor(private auth: Auth,
              private firestore: Firestore) {
  }


  async publisTravel() {
    debugger
    try {
      const userDocRef = doc(this.firestore, `travels/${this.travelData.travelID}`);
      await setDoc(userDocRef, {
        travelID: this.travelData.travelID,
        userID: this.auth.currentUser?.uid,
        origin : this.travelData.origin,
        destiny:this.travelData.destiny,
        travelStartDates: this.travelData.travelStartDates,
        estimatedPrice: this.travelData.estimatedPrice,
        numberOfSeatsAvailable : this.travelData.numberOfSeatsAvailable,
        comments : this.travelData.comments,
      });
      return true;
    } catch (e) {
      console.error(e)
      return null;
    }

  }

}
