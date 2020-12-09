import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalFormComponent } from './modal-form/modal-form.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalFormComponent
    ],
    declarations: [
        ModalFormComponent
    ],
    providers: [],
})
export class ComponentModule { }
