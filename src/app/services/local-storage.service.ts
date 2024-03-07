import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";


export enum StorageKey {
  SELECTED_LANG = 'LANG',
  SELECTED_LOCALE='LOCALE'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private prefix: string = environment.prefix;

  constructor() {
  }

  public set(key: string, value: any) {
    return localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(value));
  }

  /** Get a value from storage, try to parse from JSON: If fails return as string, else return as object */
  public get(key: string): any {
    let value = localStorage.getItem(`${this.prefix}_${key}`);
    try {
      value = JSON.parse(value!);
    } catch (error) {
      console.error(error);
    }
    return value;
  }


  public remove(key: string) {
    return localStorage.removeItem(`${this.prefix}_${key}`);
  }

  /** Clear all storaged values of the app (by prefix) */
  public clearAppItems() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key!.startsWith(this.prefix)) {
        console.log(`${key}: ${localStorage.getItem(key!)}`);
        localStorage.removeItem(key!);
      }
    }
  }


}
