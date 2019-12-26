import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

import { User } from './models/user';
import { DataService } from './services/data.service';
import { EnvService } from './services/env.service';
import { Observable, pipe } from 'rxjs';
import * as moment from 'moment';
import { async } from '@angular/core/testing';
import { Alarm } from './models/alarm';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
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

  user: User;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private dataService: DataService,
    private env: EnvService,
    private localNotifications: LocalNotifications
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

  ngOnInit() {
    this.getTime();
    this.getUser();
  }
  myTime: String = moment(new Date()).format("kk:mm");
  interval_;

  getTime() {
    this.interval_ = setInterval(() => {
      // this.myDate = new Date().toISOString().slice(0, 10);
      this.myTime = moment(new Date()).format("kk:mm");

      if (this.user != undefined) {
        //console.log(this.user.id);
        this.checkAlarm();
      }


    }, 20000)
  }


  result: Observable<any>;
  alarm_: Alarm;
  checkAlarm() {
    this.dataService.getFirst_plans_by_client_id(this.user.id).subscribe(
      obj => {
        this.alarm_ = obj;
      }
    );
    console.log(this.alarm_.hora_alarma);
    //Check Alarm
    if (this.alarm_.hora_alarma == this.myTime) {
      this.alertService.presentToast(this.alarm_.mensaje);
      console.log("Es hora!");
      this.single_notification();
    }

  }

  single_notification() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: this.alarm_.mensaje,
      sound: null
    });
  }


  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
    //console.log(this.user);
  }

  interval;
  async getUser() {
    this.interval_ = setInterval(() => {

      this.authService.user().subscribe(
        user => {
          this.user = user;
        }
      );



    }, 5000);
    console.log(this.user);
  }

}
