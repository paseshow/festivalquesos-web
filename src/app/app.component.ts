import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { CommonService } from '@services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'festivalQuesoWeb';

  @Input() isconfig: boolean;

  config: string;
  constructor(
    @Inject(DOCUMENT) document: any,
  ) {

  }

  ngOnInit(): void {
    let url = document.location.href;

    if (url.indexOf('configuracionEvento') != -1) {
      this.config = 'configuracionEvento';
    } else if (url.indexOf('autentificacion') != -1) {
      this.config = 'autentificacion';
    } else {
      this.config = 'pageInit'
    }
  }

}
