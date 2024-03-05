import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../../services/userData.service";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {AlertController, LoadingController} from '@ionic/angular';
import {DocumentData} from "@angular/fire/compat/firestore";
import {UserProfile} from "../../interfaces/user-profile";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile: UserProfile | undefined;
  profileAvatar: any;


  constructor(
    private userDataService: UserDataService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.userDataService.getUserProfileData().subscribe((data) => {
      this.profile = data;
    });

    this.userDataService.getUserProfileAvatar().subscribe((data) => {
      this.profileAvatar = data;
    });
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.userDataService.updateUserAvatar(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  openEditProfilePage(){
    this.router.navigateByUrl('home/account/edit-profile')
  }

  openEditAccessDataPage(){
    this.router.navigateByUrl('home/account/edit-access-data')

  }

  ngOnInit() {
  }

}
