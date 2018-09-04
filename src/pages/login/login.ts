import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import {ForgotPage} from '../forgot/forgot'
import { TabPage } from '../tab/tab';
import { LoginProvider } from '../../providers/login/login';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  public loginForm: FormGroup;
  passwordType = "password";
	passwordIcon = "ios-eye";
	passwordStatus = "hide";
	is_submit: boolean = false;
  token = {token: ''};
  constructor(
    public navCtrl: NavController,
    public loginProvider:LoginProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public formBuilder: FormBuilder) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.compose([Validators.minLength(5), Validators.required])],
        
    });
    // ,public fcm: FCM
  }
  ngOnInit() {
    this.onLoad();
  }

  togglePassword() {
    if(this.passwordStatus == "hide") {
        this.passwordStatus = "show";
        this.passwordType = "text";
        this.passwordIcon = "ios-eye-off-outline";
    } else {
        this.passwordStatus = "hide";
        this.passwordType = "password";
        this.passwordIcon = "ios-eye";
    }
 }
  onLoad(){
    this.loginProvider.onGetAccessToken().then(data =>{
      this.storage.set("sess_access_token", data['token']).then((token) => { 
        });
        this.storage.get("sess_access_token").then((token) => {
          this.token['token'] = token;
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
  Onlogin(){
    // console.log(this.loginForm.value)
    this.storage.get("sess_access_token").then((token) => {
      this.token['token'] = token;
      this.loginProvider.onLogin(this.loginForm.value,token).then((res) => {
        if(res['error'] === 1) {
          this.presentToast(res['message']);
        } else {
          this.presentToast(res['message']);
          this.storage.set("sess_user_login", res['user']).then((log) => {
              this.storage.set("sess_user_token_logged", res['token']).then((token) => {
                 this.storage.remove("sess_forgot_pass_email");
                 this.navCtrl.setRoot(TabPage);
              });
          }, err => {
             this.presentToast(res['message']);
        });
      }
    });
    })
  }

  presentToast(msg) {
    this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: "top"
    }).present();
}
}
