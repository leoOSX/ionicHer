import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  result: Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.result = this.dataService.getInfo();
  }

}
