import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageInitComponent } from './page-init.component';
import { pageInitRoutes } from './page-Init.routing';


@NgModule({
  declarations: [PageInitComponent,
    NavbarComponent, ModalFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pageInitRoutes),
    SweetAlert2Module,
    ReactiveFormsModule
  ]
})
export class PageInitModule { }
