// COMPONENTES ---------------------------------------------------------------------
import { ConfiguracionEventoComponent } from './configuracion-evento/configuracion-evento.component';

// MODULOS ---------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracionRoutes } from './administracion.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdministracionRoutes)
    ],
    exports: [],
    declarations: [
        ConfiguracionEventoComponent,
    ],
    providers: [],
})
export class AdministracionModule { }
