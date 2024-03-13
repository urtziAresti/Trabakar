import {Injectable} from '@angular/core';
import {TravelModel} from '../models/travel-model';

@Injectable({
  providedIn: 'root'
})
export class TravelPublisherService {

  public travelData: TravelModel = new TravelModel('');

  constructor() {
  }

}
