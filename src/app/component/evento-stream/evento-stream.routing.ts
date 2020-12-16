import { Routes } from '@angular/router';
import { GanadoresComponent } from '../ganadores/ganadores.component';
import { EventoStreamComponent } from './evento-stream.component';
import { EventosPasadosComponent } from './eventos-pasados/eventos-pasados.component';

export const EventoStreamRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: EventoStreamComponent
            },
            {
                path: 'eventos/:anio',
                component: EventosPasadosComponent
            },
            {
                path: 'ganadores',
                component: GanadoresComponent
            }
        ]
    }
]