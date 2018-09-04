import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import {ForgotPage} from '../forgot/forgot'
import { TabPage } from '../tab/tab';
import { LoginProvider } from '../../providers/login/login';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {
    email: '',
    password:''
  };
  token = {token: ''};
  constructor(public navCtrl: NavController,public loginProvider:LoginProvider, public toastCtrl: ToastController,public storage: Storage) {
    // ,public fcm: FCM
  }
  ngOnInit() {
    this.onLoad();
  }
  onLoad(){
    this.loginProvider.onGetAccessToken().then(data =>{
      this.storage.set("sess_access_token", data['token']).then((token) => { 
        });
        this.storage.get("sess_access_token").then((token) => {
          this.token['token'] = token;
          this.presentToast(token);
          console.log(token); 
        })
    })
    // this.fcm.getToken().then(token => {
    //   this.storage.set("sess_device_token", token).then((token) => { 
    //     console.log(token);
    //     });
    // });
  }
  onForgot(){
    this.navCtrl.setRoot(ForgotPage);
  }
  Onlogin(form){
    this.navCtrl.setRoot(TabPage);
    // var data = {
    //   email:form.value.email,
    //   password:form.value.password,
    // }
    // this.loginProvider.onLogin(data)
  }

  presentToast(msg) {
    this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: "top"
    }).present();
}
}
