import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QueueData } from '../../providers/queue-data'

import {Database} from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  queue: any[] = [];

  constructor(public navCtrl: NavController, public queueData: QueueData) {
    this.queue = [];
  }

  ionViewDidLoad() {
    this.queueData.getItems().subscribe((items: any[]) => {
      this.queue = items;
    });
  }

  bookMeNext() {
    this.queue.push({"username": "ngraziani"});
  }
}
