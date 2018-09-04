import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import {RewardPage} from '../reward/reward'
import {SurveyPage} from '../survey/survey'
import {HistoryPage} from '../history/history'
import {SettingPage} from '../setting/setting'
/**
 * Generated class for the TabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {

  rewardRoot = RewardPage;
  surveyRoot = SurveyPage;
  historyRoot = HistoryPage;
  settingRoot = SettingPage;
  
  constructor(public navCtrl: NavController) {}
}
