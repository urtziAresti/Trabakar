import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Geolocation is not supported.');
      }
    });
  }

  watchPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      let watchId: number;
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => observer.next(position),
          (error) => observer.error(error)
        );
      } else {
        observer.error('Geolocation is not supported.');
      }
      // Cleanup function when unsubscribed
      return () => {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    });
  }
}
