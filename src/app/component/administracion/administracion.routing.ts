import { Routes } from '@angular/router';

// COMPONENTES --------------------------------------------------------------------
import { ConfiguracionEventoComponent } from './configuracion-evento/configuracion-evento.component';

export const AdministracionRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'configuracionEvento',
                component: ConfiguracionEventoComponent
            }

        ]
    }
]