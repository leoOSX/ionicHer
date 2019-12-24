import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Planes',
      url: '/planes',
      icon: 'clipboard'
    },
    {
      title: 'Metas diarias',
      url: '/metas',
      icon: 'checkbox-outline'
    },
    {
      title: 'Productos',
      url: '/productos',
      icon: 'pricetags'
    },
    {
      title: 'Acerca de',
      url: '/info',
      icon: 'information-circle'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['message']);        
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/login');
      }
    );
  }
}
