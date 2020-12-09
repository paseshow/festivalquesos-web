import { Routes } from '@angular/router';
import { ModalEventoComponent } from './modal-evento/modal-evento.component';

export const routes: Routes = [
    {
        path: '/codigos/{idEvent}',
        component: ModalEventoComponent
    }
]