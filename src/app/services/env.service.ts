import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://192.168.1.24:8000/api/';
  API_URL_IMAGE = 'http://192.168.1.24:8000';
  constructor() { }
}
