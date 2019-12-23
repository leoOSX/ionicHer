import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Plan } from 'src/app/models/plan';

import { DataService } from '../../services/data.service';
import { EnvService } from '../../services/env.service';
import { Observable, pipe } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
})
export class PlanesPage implements OnInit {

  id : Number;
  user: User;
  result: Observable<any>;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private env: EnvService
  ) { }

  ngOnInit() {
    this.getUser();
  }
  listPlans(){
    this.result = this.dataService.getPlanes_by_cliente(this.user.id);
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
}
