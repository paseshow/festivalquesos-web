import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isConfig: boolean;
  config: boolean;
  constructor() {
  }

  ngOnInit(): void {
    if (this.isConfig) {
      this.config = true;
    } else {
      this.config = false;
    }
  }

}
