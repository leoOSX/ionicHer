import { Component, OnInit } from '@angular/core';

import { MenuController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

import { DataService } from '../../services/data.service';
import { EnvService } from '../../services/env.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  result: Observable<any>;
  constructor(
    private menu: MenuController, 
    private authService: AuthService,

    public dataService: DataService,
    public env: EnvService
    ) { 
    this.menu.enable(true);
    
  }

  ngOnInit() {
    this.result = this.dataService.getProductos();
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

}



