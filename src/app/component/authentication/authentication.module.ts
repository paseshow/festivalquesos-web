import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutes } from './authentication.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        AuthenticationComponent
    ],
    providers: [],
})
export class AuthenticationModule { }
