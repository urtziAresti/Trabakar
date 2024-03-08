import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {UserProfile} from "../interfaces/user-profile";
import {addDoc, collection, collectionData, doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Auth} from "@angular/fire/auth";
import {ChatMessage} from "../interfaces/chatMessage";
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore,
              private auth: Auth) {
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


  async sendMessage(destinataryUser: UserProfile, message: string) {
    const originaryUser = this.auth.currentUser;

    const messageData: DocumentData = {
      destinataryID: destinataryUser!.id,
      originaryID: originaryUser!.uid,
      message_timestamp: new Date().getTime(),
      messageText: message
    }
    try {
      const chatRoomKey = this.generateUniqueHash(destinataryUser!.id, originaryUser!.uid);
      console.warn(chatRoomKey);

      const userDocRef = collection(this.firestore, `chatRooms/chatRoom-${chatRoomKey}/chats`);
      await addDoc(userDocRef, messageData);
      return true;
    } catch (e) {
      console.error('Error sending message:', e);
      return false;
    }
  }

  getMessage(destinataryUser: UserProfile) {
    const originaryUser = this.auth.currentUser;
    const chatRoomKey = this.generateUniqueHash(destinataryUser!.id, originaryUser!.uid)
    const userDocRef = collection(this.firestore, `chatRooms/chatRoom-${chatRoomKey}/chats`);

    return collectionData(userDocRef).pipe(
      map((docs: DocumentData[]) => {
        return docs.map(doc => {
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

  generateUniqueHash(value1: string, value2: string): string {
    let UIDSArray = [value1.toLowerCase(), value2.toLowerCase()].sort();

    return Md5.hashStr(UIDSArray.toString().replace('/', ''));
  }
}
