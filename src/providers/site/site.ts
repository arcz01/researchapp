import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the SiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiteProvider {

  public generic_error_msg = "Something went wrong. Please try again.";

  constructor(public http: HttpClient,public toastCtrl: ToastController,) {
    console.log('Hello SiteProvider Provider');
  }

  showToast(thisMsg) {
    let options = {
        message: thisMsg,
        position: "top",
        showCloseButton: true,
        duration: 3000,
        closeButtonText: "x"
    };
    this.toastCtrl.create(options).present();
  }

}
