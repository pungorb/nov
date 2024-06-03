import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean;

  constructor(private api: ApiService) {
    this.api.showLoader.subscribe(value => {
      this.showLoader = value;
    });
  }

  ngOnInit(): void {
  }

  onClick() {
    this.api.showLoader.next(false);
  }
}
