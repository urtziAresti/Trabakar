import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {CarModel} from "../interfaces/car-model";

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(private http: HttpClient) {
  }

  getCarModels(): Observable<CarModel[]> {
    return this.http.get<any[]>('assets/carModels.json').pipe(
      map((data: any[]) => {
        return data.map(item => ({
          Automaker: item.Automaker,
          Automaker_ID: item.Automaker_ID,
          Genmodel: item.Genmodel,
          Genmodel_ID: item.Genmodel_ID
        }));
      })
    );
  }

}
