import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventoStreamComponent } from './evento-stream.component';
import { EventoStreamRoutes } from './evento-stream.routing';
import { PlyrModule } from 'ngx-plyr';
import { EventosPasadosComponent } from './eventos-pasados/eventos-pasados.component';

@NgModule({
    imports: [
        RouterModule.forChild(EventoStreamRoutes),
        CommonModule,
        PlyrModule
    ],
    exports: [],
    declarations: [
        EventoStreamComponent,
        EventosPasadosComponent
    ],
    providers: [],
})
export class EventoStreamModule { }
