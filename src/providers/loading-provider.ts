import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Loading, LoadingController } from 'ionic-angular';


/*
  Generated class for the Loading provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingProvider {

  loading: Loading;
  constructor(private loadingController: LoadingController) {
  }

  show(content): Promise<any> {
    this.loading = this.loadingController.create({
      content: content
    });

    return this.loading.present();
  }

  show(content): Promise<any> {
    this.loading = this.loadingController.create({
      content: content
    });

    return this.loading.present();
  }

  dismiss(dismissCallback: Function = () => { }): Promise<any> {
    this.loading.onDidDismiss(dismissCallback);

    return this.loading.dismiss();
  }
}
