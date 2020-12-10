import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComponentModule } from '../component.module';
import { PageInitComponent } from './page-init.component';
import { pageInitRoutes } from './page-Init.routing';


@NgModule({
  declarations: [
    PageInitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pageInitRoutes),
    ReactiveFormsModule,
    SweetAlert2Module,
    ComponentModule
  ]
})
export class PageInitModule { }
