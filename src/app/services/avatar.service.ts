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
export class AvatarService {

  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) {
  }

  getUserProfile(): Observable<UserProfile> {
    const user = this.auth.currentUser;

    debugger
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return docData(userDocRef).pipe(
      map((data: any) => {
        const userProfile: UserProfile = {
          id: user?.uid,
          imageUrl : data.imageUrl
        };
        return userProfile;
      })
    );
  }


  async updateUserData(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user?.uid}/profile.webp`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user?.uid}`);
      await setDoc(userDocRef, {
        imageUrl
      });
      return true;
    } catch (e) {
      return null;
    }
  }


}
