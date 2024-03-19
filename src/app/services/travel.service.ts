import {Injectable} from '@angular/core';
import {TravelModel} from '../models/travel-model';
import {collection, collectionData, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Travel} from "../interfaces/travel";
import {DocumentData} from "@angular/fire/compat/firestore";
import FuzzySet from 'fuzzyset'

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  public travelData: TravelModel = new TravelModel('');
  public travels: Travel[] = []

  private _allTravels$: BehaviorSubject<Travel[]> = new BehaviorSubject<Travel[]>([]);

  public readonly allTravels: Observable<Travel[]> =
    this._allTravels$.asObservable()

  public readonly filterTravelsByOriginAndDestination$: (
    origin: string,
    destiny: string
  ) => Observable<Travel[] | null> = (origin, destiny) =>
    this._allTravels$.pipe(
      map(travels => {
        const originFuzzySet = FuzzySet(travels.map(
          travel => travel.origin?.name).filter(name => name !== undefined
        ) as string[]);
        const destinyFuzzySet = FuzzySet(travels.map(travel => travel.destiny?.name).filter(name => name !== undefined) as string[]);

        const originMatches = originFuzzySet.get(origin.toLowerCase());
        const destinyMatches = destinyFuzzySet.get(destiny.toLowerCase());

        const similarityThreshold = 0.4;

        const filteredTravels = travels.filter(travel => {
          const originMatch =
            originMatches ? originMatches.some(match => match[0] > similarityThreshold) : false;
          const destinyMatch =
            destinyMatches ? destinyMatches.some(match => match[0] > similarityThreshold) : false;
          return originMatch || destinyMatch;
        });
        return filteredTravels.length > 0 ? filteredTravels : null;
      })
    );

  constructor(
    private auth: Auth,
    private firestore: Firestore) {
    this.getAllTravels().subscribe();
  }

  getAllTravels(): Observable<Travel[]> {
    const allUsersCollectionRef = collection(this.firestore, `travels`);
    return collectionData(allUsersCollectionRef).pipe(
      map((allTravels: DocumentData[]) => {
        this.travels = allTravels.map(travelData => {
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
          } as Travel;
        });
        return this.travels;
      }),
      tap(allTravels => this._allTravels$.next(allTravels)), // Emit the retrieved data
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
