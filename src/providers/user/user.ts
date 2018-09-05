// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { SiteProvider } from '../site/site';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  apiBase: string = 'http://dev.survey.livewire365.com/api';
  accessToken:any ="";
  deviceToken: any="cX6K89KLwlQ:APA91bFTqK0l_G0oS0ZbBi1XvFuPuGJRhlnvG_pnS8-SiHlMqK1wiNQ6ax1A79Ei4Qhb6m80h2aaicOapuNqEPPivHbv9Hl5mVweDCjgfZdWJbaw4x9m7yltzXSUaRqhbA0oUt8Zswim";
  constructor(
    public http: Http,
    public storage: Storage, 
    public toastCtrl: ToastController,
    public siteprovider:SiteProvider) {
  }

  OnChangePassword(data,token) {
    return new Promise(resolve => {
      let url = this.apiBase+'/user/changepassword';
      let formData = data;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
  
      headers.append('Authorization', 'Bearer '+token);
      headers.append('deviceToken', this.deviceToken);
  
      let options = new RequestOptions({headers: headers});
      let request = this.http.post(url, formData, options).map(res => res.json());          
      request.subscribe(data1 => {
        resolve(data1);
      }, err => { 
        this.siteprovider.showToast(this.siteprovider.generic_error_msg);
        resolve({ error: 1, message: this.siteprovider.generic_error_msg }); 
      });
    });
  }



}
