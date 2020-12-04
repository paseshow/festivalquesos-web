import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageInitComponent } from './page-init.component';
import { pageInitRoutes } from './page-Init.routing';



@NgModule({
  declarations: [PageInitComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pageInitRoutes)
  ]
})
export class PageInitModule {}
