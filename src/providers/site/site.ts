// import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  apiBase: string = 'http://dev.survey.livewire365.com/api';
  accessToken:any ="";
  deviceToken: any="cX6K89KLwlQ:APA91bFTqK0l_G0oS0ZbBi1XvFuPuGJRhlnvG_pnS8-SiHlMqK1wiNQ6ax1A79Ei4Qhb6m80h2aaicOapuNqEPPivHbv9Hl5mVweDCjgfZdWJbaw4x9m7yltzXSUaRqhbA0oUt8Zswim";
  constructor(public http: Http,public toastCtrl: ToastController,) {
  }

  OnGetMaritalList(token) {
    return new Promise(resolve => {
      let url = this.apiBase+'/Dropdownlist/marital_status';
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
  
      headers.append('Authorization', 'Bearer '+token);
      headers.append('deviceToken', this.deviceToken);
  
      let options = new RequestOptions({headers: headers});
      let request = this.http.get(url, options).map(res => res.json());          
      request.subscribe(data1 => {
        resolve(data1);
      }, err => { 
        this.showToast(this.generic_error_msg);
        resolve({ error: 1, message: this.generic_error_msg }); 
      });
    });
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
