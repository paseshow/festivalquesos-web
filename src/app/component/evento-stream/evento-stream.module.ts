import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlyrModule } from 'ngx-plyr';
import { ComponentModule } from '../component.module';
import { GanadoresComponent } from '../ganadores/ganadores.component';
import { EventoStreamComponent } from './evento-stream.component';
import { EventoStreamRoutes } from './evento-stream.routing';
import { EventosPasadosComponent } from './eventos-pasados/eventos-pasados.component';

@NgModule({
    imports: [
        RouterModule.forChild(EventoStreamRoutes),
        CommonModule,
        PlyrModule,
        ComponentModule
    ],
    exports: [],
    declarations: [
        EventoStreamComponent,
        EventosPasadosComponent,
        GanadoresComponent
    ],
    providers: [],
})
export class EventoStreamModule { }
