// MODULOS -----------------------------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';


// COMPONENTES -------------------------------------------------------
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
