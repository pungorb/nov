import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private translate: TranslateService) {
    translate.addLangs(['hu', 'en', 'de']);
    translate.setDefaultLang('en');
    translate.use('en');

  }


  ngOnInit() {

  }

}
