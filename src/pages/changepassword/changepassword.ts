import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  changepassForm: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public toastCtrl: ToastController,
    public userProvider:UserProvider
  ) {

    this.changepassForm = formBuilder.group({
      currentpass: ['',Validators.compose([Validators.required])],
      newpass: ['', Validators.compose([Validators.required])],
      confirmpass: ['', Validators.compose([Validators.required])],
     
  });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  onChangePassword(){
    if(this.changepassForm.value.confirmpass != this.changepassForm.value.newpass ){
      this.presentToast('Password not Match!');
    }else{
    var data ={
      current_password:this.changepassForm.value.currentpass,
      new_password:this.changepassForm.value.newpass
    }
    this.storage.get("sess_user_token_logged").then((token) => {
      this.userProvider.OnChangePassword(data,token).then((res) =>{
        console.log('Response:',res)
        if(res['error'] === 1) {
          this.presentToast(res['message']);
        } else {
          console.log('Response:',res)
          this.navCtrl.pop();
          this.presentToast(res['message']);
      }
      })
    })
    }
  }
  onBack(){
    this.navCtrl.pop();
  }

  presentToast(msg) {
    this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: "top"
    }).present();
  }
}
