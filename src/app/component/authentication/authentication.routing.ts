import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'login'
            },
            {
                path: 'login',
                component: AuthenticationComponent
            }
        ]
    }
]

export class AuthenticationRouting { }