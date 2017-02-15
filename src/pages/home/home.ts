import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QueueData } from '../../providers/queue-data'

import { Database } from '@ionic/cloud-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GoogleAuth, User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  queue: any[] = [];

  constructor(public navCtrl: NavController
    , public queueData: QueueData
    , public db: Database
    , public alertCtrl: AlertController
    , public loadingCtrl: LoadingController
    , public user: User) {
    let loader = this.loadingCtrl.create({
      content: "Loading queue..."
    });
    loader.present();
    this.db.connect();
    this.db.collection('items').watch().subscribe((items) => {
      this.queue = items;
      loader.dismiss();
    }, (error) => {
      console.error(error);
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
  }

  alreadyInQueue(): boolean {    
    if (this.loggedIn())
      return this.queue.find(item => item.id == this.user.social.google.uid);

    return false;
  }

  unBookMe() {
    if (this.alreadyInQueue()) {
      let alert = this.alertCtrl.create({
        title: 'Un book me',
        subTitle: 'Are you sure you want to quit the queue?',
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
              this.db.collection("items").remove({ id: this.user.social.google.uid })
            }
          }
        ]
      });
      alert.present();
    }
  }

  loggedIn(): boolean {
    if (this.user == undefined)
      return false;
    if (this.user.social == undefined)
      return false;

    return this.user.social.google != undefined;
  }

  bookMeNext() {
    if (!this.loggedIn()) {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'You need to sign before you can queue yourself',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.alreadyInQueue()) {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Your user is already in the queue!',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.db.collection('items').store(
        {
          id: this.user.social.google.uid
          , username: this.user.social.google.data.full_name
          , avatar: this.user.social.google.data.profile_picture
          , time: Date.now()
        });
    }
  }
}
