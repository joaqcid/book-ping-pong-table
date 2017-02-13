import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlertController } from 'ionic-angular';
import { GoogleAuth, User } from '@ionic/cloud-angular';
import { GooglePlus } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(public platform: Platform, public googleAuth: GoogleAuth, public user: User, public alertCtrl: AlertController) {
    this.initializeApp();    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  googleSignIn() {
    this.googleAuth.login().then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  googleLogOut() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure want to log out?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');            
            this.googleAuth.logout().then(() => {
              console.log("logout");
              GooglePlus.disconnect();
            }, err => {
              console.log("error logging out");
              console.log(err);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
