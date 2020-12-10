import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventoStreamComponent } from './evento-stream.component';
import { EventoStreamRoutes } from './evento-stream.routing';


@NgModule({
    imports: [
        RouterModule.forChild(EventoStreamRoutes)
    ],
    exports: [],
    declarations: [EventoStreamComponent],
    providers: [],
})
export class EventoStreamModule { }
