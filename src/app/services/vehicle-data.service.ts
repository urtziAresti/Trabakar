import {Injectable} from '@angular/core';
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {Vehicle} from "../interfaces/vehicle";
import {Auth} from "@angular/fire/auth";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {

  constructor(private auth: Auth,
              private firestore: Firestore,) {
  }


  getUserVehicleData(): Observable<Vehicle> {
    const user = this.auth.currentUser;
    const userVehicleDocRef = doc(this.firestore, `users-vehicles/${user?.uid}`);
    return docData(userVehicleDocRef).pipe(
      map((data: any) => {
        const userVehicle: Vehicle = {
          manufacturer: data['manufacturer'],
          model: data['model'],
          color: data['color']
        };
        return userVehicle;
      })
    );
  }

  async saveUservehicleData(vehicleData: Vehicle) {
    const user = this.auth.currentUser;

    try {
      const userDocRef = doc(this.firestore, `users-vehicles/${user?.uid}`);
      await setDoc(userDocRef, {
        manufacturer: vehicleData.manufacturer,
        model: vehicleData.model,
        color: vehicleData.color
      });
      return true;
    } catch (e) {
      return null;
    }
  }

}
