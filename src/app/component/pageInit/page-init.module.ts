import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageInitComponent } from './page-init.component';
import { pageInitRoutes } from './page-Init.routing';



@NgModule({
  declarations: [PageInitComponent,
    NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pageInitRoutes)
  ]
})
export class PageInitModule { }
