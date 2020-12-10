import { Routes } from '@angular/router';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';

// COMPONENTES --------------------------------------------------------------------
import { ConfiguracionEventoComponent } from './configuracion-evento.component';
import { ConfiguracionStreamComponent } from './configuracion-stream/configuracion-stream.component';
import { PageErrorComponent } from './page-error/page-error.component';

export const AdministracionRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ConfiguracionEventoComponent
            },
            {
                path: 'adminUsuarios',
                component: AdministrarUsuariosComponent
            },
            {
                path: 'stream',
                component: ConfiguracionStreamComponent
            },
            {
                path: 'error',
                component: PageErrorComponent
            }

        ]
    }
]