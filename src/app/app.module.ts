import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QueueData } from '../providers/queue-data';
import { LoginPage } from '../pages/login/login';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { LoadingProvider } from '../providers/loading-provider';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'fb9ef3e5'
  },
  'auth': {
    'google': {
      'webClientId': '23608374481-nbng2cncf6hoaao9ftv3lfd9jsquenn1.apps.googleusercontent.com',
      'scope': []
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    QueueData
    , LoadingProvider
    , [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
  ]
})
export class AppModule { }
