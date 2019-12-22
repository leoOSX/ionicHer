import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { EnvService } from '../../services/env.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  result: Observable<any>;
  constructor(
    private dataService: DataService,
    private env: EnvService
    ) { }

  ngOnInit() {
    this.result = this.dataService.getProductos();
  }

}
