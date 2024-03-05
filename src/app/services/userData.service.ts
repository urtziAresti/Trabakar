import {Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {getDownloadURL, ref, Storage, uploadString} from '@angular/fire/storage';
import {Photo} from '@capacitor/camera';
import {DocumentData} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {UserProfile} from "../interfaces/user-profile";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userAvatar!:string;

  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) {
  }

  getUserProfileData(): Observable<UserProfile> {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return docData(userDocRef).pipe(
      map((data: any) => {
        const userProfile: UserProfile = {
          id: user?.uid,
          imageUrl : data.imageUrl,
          name : data.name,
          surname : data.surname
        };
        return userProfile;
      })
    );
  }

  getUserProfileAvatar(): Observable<UserProfile> {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users-avatar/${user?.uid}`);
    return docData(userDocRef).pipe(
      map((data: any) => {
        const userProfile: any = {
          imageUrl : data.imageUrl,
        };
        return userProfile;
      })
    );
  }

  async updateUserData(updatedProfileData: UserProfile) {
    const user = this.auth.currentUser;

    try {

      const userDocRef = doc(this.firestore, `users/${user?.uid}`);
      await setDoc(userDocRef, {
        name:updatedProfileData.name,
        surname : updatedProfileData.surname,
        id : user?.uid,
        imageUrl : this.userAvatar
      });
      return true;
    } catch (e) {
      return null;
    }
  }


  async updateUserAvatar(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user?.uid}/profile.webp`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      this.userAvatar = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users-avatar/${user?.uid}`);
      await setDoc(userDocRef, {
        imageUrl:this.userAvatar
      });
      return true;
    } catch (e) {
      return null;
    }
  }

}
