import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the QueueData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QueueData {

  data: any;

  constructor(public http: Http) {
    console.log('Hello QueueData Provider');
  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json').map(
        (data: any) => {
          return data.json();
        }
      );
    }
  }

  getItems() {
    return this.load().map((data: any) => {
      return data.items;
    });
  }

  getSpeakers() {

  }

}
