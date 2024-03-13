import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UserDataService} from "../../../services/userData.service";
import {Auth} from "@angular/fire/auth";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-edit-access-data',
  templateUrl: './edit-access-data.page.html',
  styleUrls: ['./edit-access-data.page.scss'],
})
export class EditAccessDataPage implements OnInit {

  accessDataForm: FormGroup;

  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private router: Router,
              private userDataService: UserDataService,
              private auth: Auth,
              private translate: TranslateService) {

    const user = this.auth.currentUser;

    this.accessDataForm = this.fb.group({
      email: [user?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator: (control: FormGroup) => ({ [p: string]: any } | null) =
    (control: FormGroup): { [key: string]: any } | null => {
      const password = control.get('password');
      const repeatPassword = control.get('repeatPassword');
      return password && repeatPassword && password.value !== repeatPassword.value ? {'passwordMismatch': true} : null;
    };

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
    this.userDataService.updateUserEmailAccessData(this.email?.value).then(() =>
      this.userDataService.updateUserData(this.accessDataForm.value).then(() => {
        this.showAlert('', this.translate.instant('EDIT_ACCESS_DATA.EMAIL_SUCCESS_ALERT')).then(() =>
          this.router.navigateByUrl('home/account')
        )
      })
    ).catch(err => {
      console.error(err)
      this.showAlert('', this.translate.instant('EDIT_ACCESS_DATA.EMAIL_ERROR_ALERT')).then()
    })
  }

  updateUserPassAccessData() {
    this.userDataService.updateUserPassAccessData(this.password?.value).then(() =>
      this.userDataService.updateUserData(this.accessDataForm.value).then(() => {
        this.showAlert('', this.translate.instant('EDIT_ACCESS_DATA.PASS_SUCCESS_ALERT')).then(() =>
          this.router.navigateByUrl('home/account')
        )
      })
    ).catch(err => {
      console.error(err)
      this.showAlert('', this.translate.instant('EDIT_ACCESS_DATA.PASS_ERROR_ALERT')).then()
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
