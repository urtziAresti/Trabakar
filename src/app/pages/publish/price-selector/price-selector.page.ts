import {Component, OnInit} from '@angular/core';
import {TravelModel} from "../../../models/travel-model";
import {TravelService} from "../../../services/travel.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-price-selector',
  templateUrl: './price-selector.page.html',
  styleUrls: ['./price-selector.page.scss'],
})
export class PriceSelectorPage implements OnInit {
  estimatedPrice: number = 1;
  travelComments: string = '';

  constructor(private travelService: TravelService,
              private router: Router,
              private alertController: AlertController) {
  }

  ngOnInit() {
  }

  addEur() {
    this.estimatedPrice++;
  }

  removeEur() {
    this.estimatedPrice--;
  }

  nextPage() {

    const travelData: TravelModel = this.travelService.travelData;
    travelData.estimatedPrice = this.estimatedPrice;
    travelData.comments = this.travelComments;
    this.travelService.publishTravel().then(() => {
      this.router.navigateByUrl('home/publish')
      this.showCorrectPublish("Viaje añadido", "Tu viaje a sido publicado. Ya pudes buscarlo")
    }).catch(err => {
      console.error(err)
      this.showCorrectPublish("Error al guardar", "Vuelve a intentarlo")

    })
  }


  async showCorrectPublish(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
