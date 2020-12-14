import { Routes } from '@angular/router';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { PageInitComponent } from './page-init.component';

export const pageInitRoutes: Routes = [
    { path: '', component: PageInitComponent },
    { path: 'form', component: ModalFormComponent }
];