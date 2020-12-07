// MODULOS -----------------------------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';


// COMPONENTES -------------------------------------------------------
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
