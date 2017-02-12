import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAuth, User } from '@ionic/cloud-angular';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public googleAuth: GoogleAuth
    , public user: User) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPagePage');
    console.log(`user: ${this.user.social.google.data.raw_data}`);
  }

  googleSignIn() {
    this.googleAuth.login().then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  googleLogOut() {
    this.googleAuth.logout().then(() => {
      console.log("logout");
    }, err => {
      console.log(err);
    });
  }

}
