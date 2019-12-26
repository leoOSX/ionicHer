import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Alarm } from '../models/alarm';
import { Observable, pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(
    private env: EnvService,
    private http: HttpClient
  ) { }

  getInfo() {
    return this.http.get(this.env.API_URL + 'info');
  }
  getProductos() {
    return this.http.get(this.env.API_URL + 'productos');
  }
  getPlanes() {
    return this.http.get(this.env.API_URL + 'planes');
  }


  getPlanes_by_cliente(id: Number) {
    return this.http.post(
      this.env.API_URL + 'plans_by_client_id',
      {
        client_id: id
      }
    );
  }

  getMetas_by_client_id(id: Number) {
    return this.http.post(
      this.env.API_URL + 'ejecutions_by_client_id',
      {
        client_id: id
      }
    );
  }

  getEjecution_check(id_: Number) {
    this.http.post(
      this.env.API_URL + 'ejecution_check',
      {
        id: id_
      }
    ).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("OK");
      }
    );
  }



  getFirst_plans_by_client_id(id: Number) {
    return this.http.post<Alarm>(
      this.env.API_URL + 'first_plans_by_client_id',
      {
        client_id: id
      }
    ).pipe(alarm => {
      return alarm;
    });
  }



}
