import { Routes } from '@angular/router';
import { EventoStreamComponent } from './evento-stream.component';
import { EventosPasadosComponent } from './eventos-pasados/eventos-pasados.component';

export const EventoStreamRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: ':quesos',
                component: EventoStreamComponent
            },
            {
                path: 'eventos/:anio',
                component: EventosPasadosComponent
            }
        ]
    }
]