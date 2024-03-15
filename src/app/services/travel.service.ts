import {Injectable} from '@angular/core';
import {TravelModel} from '../models/travel-model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  public travelData: TravelModel = new TravelModel('');

  constructor() {
  }

}
