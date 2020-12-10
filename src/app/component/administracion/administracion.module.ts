// COMPONENTES ---------------------------------------------------------------------
import { ConfiguracionEventoComponent } from './configuracion-evento.component';

// MODULOS ---------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracionRoutes } from './administracion.routing';
import { ComponentModule } from '../component.module';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { ConfiguracionStreamComponent } from './configuracion-stream/configuracion-stream.component';
import { ModalEventoComponent } from './configuracion-stream/modal-evento/modal-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageErrorComponent } from './page-error/page-error.component';
import { ReporteComponent } from './reporte/reporte.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdministracionRoutes),
        ComponentModule,
        ReactiveFormsModule
    ],
    exports: [

    ],
    declarations: [
        ConfiguracionEventoComponent,
        AdministrarUsuariosComponent,
        ConfiguracionStreamComponent,
        PageErrorComponent,
        ReporteComponent
    ],
    providers: [],
})
export class AdministracionModule { }
