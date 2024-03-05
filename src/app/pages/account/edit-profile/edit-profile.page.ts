import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../../services/userData.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userDataForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private authService: AuthService,
              private router: Router,
              private userDataService: UserDataService) {

    this.userDataForm = this.fb.group({
      name: ['Urr', [Validators.required]],
      surname: ['ares', [Validators.required]]
    });
  }


  get name() {
    return this.userDataForm.get('name');
  }


  updateUser() {
    this.userDataService.updateUserData(this.userDataForm.value).then(res => {
      console.warn(res)
      this.showAlert('', 'Usuario actualizado correctamente!!').then(() =>
        this.router.navigateByUrl('home/account')
      )
    }).catch(err => {
      console.error(err)
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

  ngOnInit() {
  }

}
