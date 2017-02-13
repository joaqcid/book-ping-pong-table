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
    });
  }

  ionViewDidLoad() {    
  }

  bookMeNext() {
    if (this.queue.find(item => item.id == "joaqcid")) {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Your user is already in the queue!',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(!this.user.social.google){
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'You need to sign before you can queue yourself',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.db.collection('items').store({ id: "joaqcid", username: "joaqcid", time: Date.now() });
    }
  }
}
