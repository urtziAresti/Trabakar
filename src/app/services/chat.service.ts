import {Injectable} from '@angular/core';
import {combineLatest, map, Observable, of, switchMap} from "rxjs";
import {UserProfile} from "../interfaces/user-profile";
import {
  addDoc,
  collection,
  collectionData, doc, docData,
  Firestore,
  getDocs,
} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Auth} from "@angular/fire/auth";
import {ChatMessage} from "../interfaces/chatMessage";
import {Md5} from 'ts-md5';
import {Travel} from "../interfaces/travel";
import {Userprofiletravel} from "../interfaces/userprofiletravel";
import {getDownloadURL, ref, Storage, uploadString,uploadBytes} from '@angular/fire/storage';
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore,
              private auth: Auth,
              private storage: Storage,
  ) {
  }

  getContactedUsers(): Observable<Userprofiletravel[]> {
    const currentUser = this.auth.currentUser;
    const allUsersCollectionRef = collection(this.firestore, 'travels');

    // @ts-ignore
    return collectionData(allUsersCollectionRef).pipe(
      switchMap((allTravels: DocumentData[]) => {
        const getUserObservables: (Observable<{
          travelData: Travel;
          userProfile: UserProfile
        }> | Observable<null>)[] = allTravels.map(travelData => {
          if (travelData['travelClientsUIDs'] && travelData['travelClientsUIDs'].includes(currentUser?.uid)) {
            return this.getUserById(travelData['userID']).pipe(
              map((userProfile: UserProfile) => {
                const travelDatas: Travel = {
                  destiny: travelData['destiny'],
                  origin: travelData['origin'],
                  userID: travelData['userID'],
                  travelID: travelData['travelID'],
                  comments: travelData['comments'],
                  numberOfSeatsAvailable: travelData['numberOfSeatsAvailable'],
                  estimatedPrice: travelData['estimatedPrice'],
                  publishDate: travelData['publishDate'],
                  travelStartDates: travelData['travelStartDates'],
                  travelStartTime: travelData['travelStartTime'],
                  travelDuration: travelData['travelDuration']
                };

                return {
                  userProfile: userProfile,
                  travelData: travelDatas
                };
              })
            );
          } else {
            // If the user is not part of this travel, return an empty observable
            return of(null);
          }
        });

        // Combine all observables into one observable array
        return combineLatest(getUserObservables).pipe(
          // Filter out null values and flatten the array of Userprofiletravel objects
          map(results => results.filter(result => result !== null).flat())
        );
      })
    );
  }

  getUserById(userId: string): Observable<UserProfile> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef).pipe(
      map((data: any) => {
        console.warn("userData", data)
        return {
          id: data['id'],
          name: data['name'],
          surname: data['surname']
        } as UserProfile;
      })
    );
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

  async sendMessage(destinataryUserUID: string, message: string) {
    const originaryUser = this.auth.currentUser;

    const messageData: DocumentData = {
      destinataryID: destinataryUserUID,
      originaryID: originaryUser!.uid,
      message_timestamp: new Date().getTime(),
      messageText: message
    }
    try {
      const chatRoomKey = this.generateUniqueHash(destinataryUserUID!, originaryUser!.uid);
      const userDocRef = collection(this.firestore, `chatRooms/chatRoom-${chatRoomKey}/chats`);
      await addDoc(userDocRef, messageData);
      this.updateFirebaseJSONOFChats(messageData);
      return true;
    } catch (e) {
      console.error('Error sending message:', e);
      return false;
    }
  }


  async updateFirebaseJSONOFChats(messageData: any) {


    var jsonData = JSON.stringify(messageData);

    const filePath = 'https://firebasestorage.googleapis.com/v0/b/trabacar-36366.appspot.com/o/chats%2FlastChats3.json?alt=media&token=3adf683f-ac37-41b8-8118-0c6a4e9933f4';
    const storageRef = ref(this.storage, filePath);

    try {
      var jsonBlob = new Blob([jsonData], {type: "application/json"})

      uploadBytes(storageRef,jsonBlob,{
        contentType:'application/json'
      })

      return true
    } catch (e) {
      console.error(e)
      return null;
    }
  }

  getMessage(destinataryUser: UserProfile): Observable<ChatMessage[]> {

    const currentUser = this.auth.currentUser;
    const chatRoomKey = this.generateUniqueHash(destinataryUser.id.toString(), currentUser!.uid)
    const userDocRef = collection(this.firestore, `chatRooms/chatRoom-${chatRoomKey}/chats`);

    return collectionData(userDocRef).pipe(
      map((docs: DocumentData[]) => {
        return docs.map((doc) => {
          return {
            destinataryID: doc['destinataryID'],
            originaryID: doc['originaryID'],
            message_timestamp: new Date(doc['message_timestamp']),
            messageText: doc['messageText']
          } as ChatMessage;
        });
      })
    );
  }

  async getCollectionDataIds(collectionPath: string) {
    const collectionRef = collection(this.firestore, collectionPath);
    const querySnapshot = await getDocs(collectionRef);
    const documentIds: String[] = [];
    querySnapshot.forEach(doc => {
      documentIds.push(doc.id);
    });
    return documentIds;
  }

  generateUniqueHash(value1: string, value2: string): string {
    let UIDSArray = [value1.toLowerCase(), value2.toLowerCase()].sort();
    return Md5.hashStr(UIDSArray.toString().replace('/', ''));
  }


}
