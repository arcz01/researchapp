import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {ProgressBarModule} from "angular-progress-bar"
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabPage } from '../pages/tab/tab';
import { ForgotPage } from '../pages/forgot/forgot';
import { RewardPage } from '../pages/reward/reward';
import { SurveyPage } from '../pages/survey/survey';
import { HistoryPage } from '../pages/history/history';
import { SettingPage } from '../pages/setting/setting';
import { LoginProvider } from '../providers/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { LoginPage } from '../pages/login/login';
import { SiteProvider } from '../providers/site/site';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { UserProvider } from '../providers/user/user';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ForgotPage,
    TabPage,
    RewardPage,
    SurveyPage,
    HistoryPage,
    SettingPage,
    EditProfilePage,
    LoginPage,
    ChangepasswordPage
  ],
  imports: [
    BrowserModule,
    ProgressBarModule,
    HttpModule ,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ForgotPage,
    TabPage,
    RewardPage,
    SurveyPage,
    HistoryPage,
    SettingPage,
    EditProfilePage,
    LoginPage,
    ChangepasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    FCM,
    SiteProvider,
    UserProvider
  ]
})
export class AppModule {}
