import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, App } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  user_data:any= "";
  token = {token: ''};
  notif:any="false";
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public storage: Storage,
     private alertCtrl: AlertController,
     public appCtrl: App,) {
  }

  ionViewDidLoad() {
    this.storage.get("sess_user_login").then((data) => {
      this.user_data = data;
      // console.log('USER DATA INFO: ',data)
    });
  }

  onChangePassword(){
    const modal = this.modalCtrl.create(ChangepasswordPage);
    modal.present();
  }

  onEditProfile(){
    console.log('hello')
    const modal = this.modalCtrl.create(EditProfilePage,{
  		'profile': this.user_data
  	});
    modal.present();
    // this.navCtrl.setRoot(EditProfilePage);
  }
  onLogout(){
    let alert = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you sure you want to log out?',
      cssClass: 'LogoutAlert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log Out',
          handler: () => { 
              //this.storage.remove('jwt');
              this.storage.remove('sess_user_login').then(() => {
                this.storage.remove('sess_user_token').then(() => {
                  this.appCtrl.getRootNav().setRoot(LoginPage);
                });
              });
          }
        }
      ]
    });

    alert.present();
  }
}
