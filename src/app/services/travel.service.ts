import {Injectable} from '@angular/core';
import {TravelModel} from '../models/travel-model';
import {collection, collectionData, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {map, Observable} from "rxjs";
import {Travel} from "../interfaces/travel";
import {DocumentData} from "@angular/fire/compat/firestore";
import {UserProfile} from "../interfaces/user-profile";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  public travelData: TravelModel = new TravelModel('');

  constructor(private auth: Auth,
              private firestore: Firestore) {
  }


  getAllUsers(): Observable<UserProfile[]> {
    const allUsersCollectionRef = collection(this.firestore, `users`);
    return collectionData(allUsersCollectionRef).pipe(
      map((docs: DocumentData[]) => {
        return docs.map(doc => {
          return {
            id: doc['id'],
            name: doc['name'],
            surname: doc['surname']
          };
        });
      })
    );
  }


  getAllTravels(): Observable<Travel[]> {
    const allUsersCollectionRef = collection(this.firestore, `travels`);
    return collectionData(allUsersCollectionRef).pipe(
      map((allTravels: DocumentData[]) => {
        return allTravels.map(travelData => {
          return {
            destiny: travelData['destiny'],
            origin: travelData['origin'],
            userID: travelData['userID'],
            travelID: travelData['travelID'],
            comments: travelData['comments'],
            numberOfSeatsAvailable: travelData['numberOfSeatsAvailable'],
            estimatedPrice: travelData['estimatedPrice'],
            publishDate: travelData['publishDate'],
            travelStartDates: travelData['travelStartDates'],
            travelStartTime: travelData['travelStartTime']
          };
        });
      })
    );
  }


  async publisTravel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const userDocRef = doc(this.firestore, `travels/${this.travelData.travelID}`);
      setDoc(userDocRef, {
        travelID: this.travelData.travelID,
        userID: this.auth.currentUser?.uid,
        origin: this.travelData.origin,
        destiny: this.travelData.destiny,
        travelStartDates: this.travelData.travelStartDates,
        estimatedPrice: this.travelData.estimatedPrice,
        numberOfSeatsAvailable: this.travelData.numberOfSeatsAvailable,
        comments: this.travelData.comments,
        publishDate: new Date()
      }).then((status) => {
        console.error(status)
        resolve()
      }).catch(() => {
        reject()
      });

    })
  }
}
