import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( 
    private env: EnvService,
    private http: HttpClient 
    ) { }

  getInfo(){
    return this.http.get(this.env.API_URL + 'info');
  }
  getProductos(){
    return this.http.get(this.env.API_URL + 'productos');
  }
  getPlanes(){
    return this.http.get(this.env.API_URL + 'planes');
  }

  getPlanes_by_cliente(id: Number){
    return this.http.post(
      this.env.API_URL + 'plans_by_client_id',
      {
        client_id: id
      }
      );
  }

}
