import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
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

  user_data = (this.navParams.get('profile')) ? this.navParams.get('profile') : null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public storage: Storage
  ) {
    this.personalInfoForm = formBuilder.group({
      firstname: [this.user_data.user_profile_middlename, Validators.compose([Validators.required])],
      middlename: [this.user_data.user_profile_middlename, Validators.compose([Validators.required])],
      lastname: [this.user_data.user_profile_surname, Validators.compose([Validators.required])],
      email: [this.user_data.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      birthdate: [this.user_data.user_profile_birthdate, Validators.compose([Validators.required])],
      gender: [this.user_data.user_profile_gender]
  });
  }
  ionViewDidLoad() {
    console.log('INFO: ',this.user_data )
    this.storage.get("sess_user_login").then((data) => {
      this.user_data = data;
      // console.log('USER DATA INFO: ',data)
    });
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
