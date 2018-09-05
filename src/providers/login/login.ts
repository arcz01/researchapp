import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { SiteProvider } from '../site/site';

@Injectable()
export class LoginProvider {
  apiBase: string = 'http://dev.survey.livewire365.com/api';
  accessToken:any ="";
  deviceToken: any="cX6K89KLwlQ:APA91bFTqK0l_G0oS0ZbBi1XvFuPuGJRhlnvG_pnS8-SiHlMqK1wiNQ6ax1A79Ei4Qhb6m80h2aaicOapuNqEPPivHbv9Hl5mVweDCjgfZdWJbaw4x9m7yltzXSUaRqhbA0oUt8Zswim";
  public generic_error_msg = "Something went wrong. Please try again.";
  constructor(
    public http: Http,
    public storage: Storage, 
    public toastCtrl: ToastController,
    public siteprovider:SiteProvider) {
  }
  
onGetAccessToken(){
return new Promise(resolve => {
        // this.storage.get("sess_device_token").then((token) => {
        //   this.deviceToken = token;
        var deviceToken = this.deviceToken;
          let data = {
            appKey: '0o8Rfr1sGyQEt3kXBcXBKh2MsHckSo09x',
            device_token: deviceToken
          }
        let url = this.apiBase+"/token/get";
          let request = this.http.post(url, data,{}).map(res => res.json()).subscribe(data => {
            if(!data['error'] || data['error'] === 0) {
              this.storage.set("sess_user_token", data.token).then((token) => { 
                resolve(data);
              });
            }
          }, err => { 
            this.siteprovider.showToast(this.siteprovider.generic_error_msg);
            resolve({ error: 1, message: this.siteprovider.generic_error_msg });  
         });
        });
}

onLogin(data,token) {
  return new Promise(resolve => {
    let url = this.apiBase+'/user/login';
    let formData = data;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    headers.append('Authorization', 'Bearer '+token);
    headers.append('Devicetoken', this.deviceToken);

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
