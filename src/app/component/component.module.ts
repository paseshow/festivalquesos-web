import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GanadoresComponent } from './ganadores/ganadores.component';
import { ModalFormComponent } from './modal-form/modal-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,

    ],
    exports: [
        ModalFormComponent,
        GanadoresComponent
    ],
    declarations: [
        ModalFormComponent,
        GanadoresComponent,
    ],
    providers: [],


})
export class ComponentModule { }
