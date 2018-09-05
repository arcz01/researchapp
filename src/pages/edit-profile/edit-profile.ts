import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { SiteProvider } from '../../providers/site/site';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  id: any;
  public personalInfoForm: FormGroup;
  maritalStatus:any ="";
  marit:any = [
  {
    id:1,
  name:'Single'
  },
  {
    id:2,
    name:'Devorced'
  }


  ]

  user_data = (this.navParams.get('profile')) ? this.navParams.get('profile') : null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public siteProvider:SiteProvider,
    public toastCtrl: ToastController,
  ) {
    this.personalInfoForm = formBuilder.group({
      firstname: [this.user_data.user_profile_middlename, Validators.compose([Validators.required])],
      middlename: [this.user_data.user_profile_middlename, Validators.compose([Validators.required])],
      lastname: [this.user_data.user_profile_surname, Validators.compose([Validators.required])],
      email: [this.user_data.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      birthdate: [this.user_data.user_profile_birthdate, Validators.compose([Validators.required])],
      gender: [this.user_data.user_profile_gender],
      marital: [this.user_data.sa_personal_info_lib_marital_status_id
      ]

  });
  }
  ionViewDidLoad() {
    console.log(this.user_data,'Marital status: ',this.user_data.sa_personal_info_lib_marital_status_id);
    this.storage.get("sess_access_token").then((token) => {
      console.log(token);
      this.siteProvider.OnGetMaritalList(token).then(res =>{
        console.log('RESPONSE: ',res);
        if(res['error'] === 1) {
          this.presentToast(res['message']);
        } else {
          console.log('RESPONSE: ',res);
          this.maritalStatus = res
          this.presentToast(res['message']);
      }
      })
    })
  }

  onEditProfile(){
    var data ={
      firstname:this.personalInfoForm.value.firstname,
      lastname:this.personalInfoForm.value.lastname,
      middlename:this.personalInfoForm.value.middlename,
      birthdate:this.personalInfoForm.value.birthdate,
      gender:this.personalInfoForm.value.gender,
      email:this.personalInfoForm.value.email,
          }


  }
  presentToast(msg) {
    this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: "top"
    }).present();
}
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [{
            text: 'Load from Library',
            handler: () => { this.openImagePicker(); }
        },
        {
            text: 'Use Camera',
            handler: () => { this.takePicture(); }
        },
        {
          text: 'Cancel',
          role: 'cancel'
      }]
    });
    actionSheet.present();
}
openImagePicker(){
  if(!this.id) {
    this.id = new Array<string>();
  }
      let options= {
        quality: 70,
      }

      this.imagePicker.getPictures(options).then((results) => {
          results.forEach((pp, pidx) => {
            let pp_pieces = pp.split("/");
            let new_pp = {
              "name": pp_pieces[pp_pieces.length - 1],
              "path": normalizeURL(pp)
            };
            console.log(this.id);
            this.id.splice(0, 1);
            this.id.push(new_pp);
          });
      }, (err) => { console.log(err) });
}
takePicture(){
  if(!this.id) {
    this.id = new Array<string>();
  }
      let options = {
        quality: 70,
        correctOrientation: true
      };

      this.camera.getPicture(options).then((data) => {
          let pp_pieces = data.split("/");
          let new_pp = {
            "name": pp_pieces[pp_pieces.length - 1],
            "path": normalizeURL(data)
          };
          console.log(this.id);
          this.id.splice(0, 1);
          this.id.push(new_pp);
      }, function(error) {
          console.log(error);
      });
}
  onBack(){
    this.navCtrl.pop();
  }

}
