// MODULOS -----------------------------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';


// COMPONENTES -------------------------------------------------------
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';

// SERVICIOS ----------------------------------------------------------------
import { UsersService } from '@services/users.service';
import { ExcelService } from '@services/excel.service';

import { AuthHttpInterceptor } from '@services/auth-http.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    ExcelService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '383429754829-7b8std7ejigtpjatf27db2m9pihjr80p.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
