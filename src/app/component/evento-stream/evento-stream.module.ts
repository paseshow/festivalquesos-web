import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EventoStreamComponent } from './evento-stream.component';
import { EventoStreamRoutes } from './evento-stream.routing';


@NgModule({
    imports: [
        RouterModule.forChild(EventoStreamRoutes),
        CommonModule
    ],
    exports: [],
    declarations: [EventoStreamComponent],
    providers: [],
})
export class EventoStreamModule { }
