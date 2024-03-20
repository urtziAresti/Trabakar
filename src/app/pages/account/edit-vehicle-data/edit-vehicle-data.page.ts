import {Component, OnInit} from '@angular/core';
import {CarModelService} from "../../../services/car-model.service";
import {CarModel} from "../../../interfaces/car-model";
import {VehicleDataService} from "../../../services/vehicle-data.service";
import {Vehicle} from "../../../interfaces/vehicle";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-vehicle-data',
  templateUrl: './edit-vehicle-data.page.html',
  styleUrls: ['./edit-vehicle-data.page.scss'],
})
export class EditVehicleDataPage implements OnInit {

  carModels: CarModel[] = [];
  filteredCarModels: CarModel[] = [];
  automakerOptions: string[] = []; // Array to hold Automaker options
  selectedAutomaker: string = '';
  selectedModel: string = '';
  selectedColor: string = '';
  vehicleColors: string[] = ["blanco", "gris", "rojo", "azul", "negro", "verde", "amarillo", "naranja", "morado", "rosa", "marrón"];

  constructor(private carModelsService: CarModelService,
              private vehiclesService: VehicleDataService,
              private alertController: AlertController,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.loadCarModels();
    this.vehiclesService.getUserVehicleData().subscribe(userVehicle => {
      console.warn(userVehicle)
      this.selectedAutomaker = userVehicle.manufacturer;
      this.selectedModel = userVehicle.model;
      this.selectedColor = userVehicle.color;
    })
  }

  getModelOptions(): string[] {
    return this.selectedAutomaker ? this.filteredCarModels.map(carModel => carModel.Genmodel) : [];
  }

  loadCarModels(): void {
    this.carModelsService.getCarModels().subscribe(data => {
      this.carModels = data;
      this.filteredCarModels = [...this.carModels];
      this.automakerOptions = [...new Set(this.carModels.map(carModel => carModel.Automaker))];
    });
  }

  updateModelOptions(): void {
    this.selectedModel = ''; // Reset selected model when automaker changes
  }

  filterCarModels(): void {
    if (this.selectedAutomaker) {
      this.filteredCarModels = this.carModels.filter(carModel => carModel.Automaker === this.selectedAutomaker);
    } else {
      this.filteredCarModels = [...this.carModels];
    }
    this.updateModelOptions();
  }

  saveVehicleData() {

    const vehicleData: Vehicle = {
      manufacturer: this.selectedAutomaker,
      model: this.selectedModel,
      color: this.selectedColor
    }

    this.vehiclesService.saveUservehicleData(vehicleData).then(() => {
      this.showAlert('', this.translate.instant('EDIT_VEHICLE_DATA.EMAIL_SUCCESS_ALERT')).then(() =>
        this.router.navigateByUrl('home/account')
      )
    })
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


}
