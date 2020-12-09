import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-init-app',
    templateUrl: 'page-init.component.html',
    styleUrls: ['page-init.component.scss']

})


export class PageInitComponent implements OnInit {

    formCodigo: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    // -------------------------------------------------------------
    // Inicializamos el formulario para validar el codigo de ingreso
    // -------------------------------------------------------------
    buildForm() {
        this.formCodigo = this.fb.group({
            codigoIngreso: ['', [Validators.required]]
        });
    }

    openStream() {

    }

}