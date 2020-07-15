import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { WelcomePage } from '../pages/welcome/welcome';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  
  rootPage:any = WelcomePage;

  constructor(platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, storage:Storage) {
    storage.clear();
    console.log('limpo');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
    
      splashScreen.hide();
    });
  }
}

