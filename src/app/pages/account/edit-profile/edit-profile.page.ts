import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UserDataService} from "../../../services/userData.service";
import {UserProfile} from "../../../interfaces/user-profile";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userDataForm!: FormGroup;
  userData!: UserProfile

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private userDataService: UserDataService,
    private translate: TranslateService) {

    this.userDataForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    });

  }

  get name() {
    return this.userDataForm.get('name');
  }

  get surname() {
    return this.userDataForm.get('surname');
  }

  updateUser() {
    this.userDataService.updateUserData(this.userDataForm.value).then(res => {
      this.showAlert('', this.translate.instant('EDIT_PROFILE_DATA.SUCCESS_ALERT')).then(() =>
        this.router.navigateByUrl('home/account')
      )
    }).catch(err => {
      console.error(err)
      this.showAlert('', this.translate.instant('EDIT_PROFILE_DATA.ERROR_ALERT')).then();
    })
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [this.translate.instant('OK')]
    });
    await alert.present();
  }

  ngOnInit() {
    this.userDataService.getUserProfileData().subscribe(userData => {
      this.userData = userData;
      this.name?.setValue(userData.name)
      this.surname?.setValue(userData.surname)
    })
  }
}
