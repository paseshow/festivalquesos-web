import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventoStreamComponent } from './evento-stream.component';
import { EventoStreamRoutes } from './evento-stream.routing';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
    imports: [
        RouterModule.forChild(EventoStreamRoutes),
        CommonModule,
        PlyrModule
    ],
    exports: [],
    declarations: [EventoStreamComponent],
    providers: [],
})
export class EventoStreamModule { }
