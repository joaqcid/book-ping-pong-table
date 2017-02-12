import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QueueData } from '../../providers/queue-data'

import { Database } from '@ionic/cloud-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  queue: any[] = [];

  constructor(public navCtrl: NavController
    , public queueData: QueueData
    , public db: Database
    , public alertCtrl: AlertController) {
    this.db.connect();
    this.db.collection('items').watch().subscribe((items) => {
      this.queue = items;
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
    else {
      this.db.collection('items').store({ id:"joaqcid", username: "joaqcid", time: Date.now() });
    }
  }
}
