import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication.routing';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
    ],
    exports: [],
    declarations: [
        AuthenticationComponent
    ],
    providers: [],
})
export class authenticationModule { }
