import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../../services/userData.service";
import {Auth} from "@angular/fire/auth";
import { updateEmail } from '@angular/fire/auth';


@Component({
  selector: 'app-edit-access-data',
  templateUrl: './edit-access-data.page.html',
  styleUrls: ['./edit-access-data.page.scss'],
})
export class EditAccessDataPage implements OnInit {

  accessDataForm: FormGroup;


  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private authService: AuthService,
              private router: Router,
              private userDataService: UserDataService,
              private auth: Auth) {

    const user = this.auth.currentUser;


    this.accessDataForm = this.fb.group({
      email: [user?.email, [Validators.required, Validators.email]],
      password: ['12345', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['12345', [Validators.required, Validators.minLength(6)]],
    });
  }


  get email() {
    return this.accessDataForm.get('email');
  }

  get password() {
    return this.accessDataForm.get('password');
  }

  get repeatPassword() {
    return this.accessDataForm.get('repeatPassword');
  }


  updateUserEmailAccessData() {

    // TODO check if 2 passwords are the same

    this.userDataService.updateUserEmailAccessData(this.email?.value).then( () =>
       this.userDataService.updateUserData(this.accessDataForm.value).then(res => {
        this.showAlert('', 'Email y contraseña actualizados correctamente!!').then(() =>
          this.router.navigateByUrl('home/account')
        )
      })
    ).catch(err => {
        console.error(err)
      })
  }



  updateUserPassAccessData() {

    // TODO check if 2 passwords are the same

    this.userDataService.updateUserPassAccessData(this.password?.value).then( () =>
      this.userDataService.updateUserData(this.accessDataForm.value).then(res => {
        this.showAlert('', 'Email y contraseña actualizados correctamente!!').then(() =>
          this.router.navigateByUrl('home/account')
        )
      })
    ).catch(err => {
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
