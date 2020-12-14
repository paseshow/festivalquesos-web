import { Routes } from '@angular/router';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';

// COMPONENTES --------------------------------------------------------------------
import { ConfiguracionEventoComponent } from './configuracion-evento.component';
import { ConfiguracionStreamComponent } from './configuracion-stream/configuracion-stream.component';
import { ModalEventoComponent } from './configuracion-stream/modal-evento/modal-evento.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { ReporteComponent } from './reporte/reporte.component';

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
                component: ConfiguracionStreamComponent,
                children: [
                    {
                        path: 'codigos',
                        component: ModalEventoComponent
                    }
                ]
            },
            {
                path: 'reporte',
                component: ReporteComponent
            },
            {
                path: 'error',
                component: PageErrorComponent
            }

        ]
    }
]