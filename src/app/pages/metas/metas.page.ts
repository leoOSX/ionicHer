import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

import { DataService } from '../../services/data.service';
import { EnvService } from '../../services/env.service';
import { Observable, pipe } from 'rxjs';

import { NavController } from '@ionic/angular';

import * as moment from 'moment';


@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
})
export class MetasPage implements OnInit {

  id : Number;
  user: User;
  result: Observable<any>;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private env: EnvService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getDate();
  }
  list(){
    this.result = this.dataService.getMetas_by_client_id(this.user.id);
  }
  getUser() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  // get_id_user(): Number {
  //   this.authService.user().subscribe(
  //     user => {
  //       return this.id = user.id;
  //     }
  //   );
  //   return this.user.id;
  // }

  myDate: String = moment(new Date()).format("YYYY-MM-DD");
  interval_;
  getDate(){
    this.interval_ = setInterval(() => {
      // this.myDate = new Date().toISOString().slice(0, 10);
      this.myDate = moment(new Date()).format("YYYY-MM-DD");
    }, 1000)
  }

  onClick(id_: Number){
    //this.navCtrl.navigateRoot('/metas');
    //this.result = this.dataService.getMetas_by_client_id(this.user.id);
    this.dataService.getEjecution_check(id_);
    this.list();
  }
}
