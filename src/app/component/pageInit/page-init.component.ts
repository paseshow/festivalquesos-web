import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CodigosService } from '@services/codigos.service';

@Component({
    selector: 'page-init-app',
    templateUrl: 'page-init.component.html',
    styleUrls: ['page-init.component.scss']

})


export class PageInitComponent implements OnInit {


    formCodigo: FormGroup;

    constructor(
        private fb: FormBuilder,
        private codigosService: CodigosService,
        private router: Router
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

    //-------------------------------------------------------------------------------------
    // Validamos la fecha y si el codigo que se ingresa corresponde al evento seleccionado.
    //-------------------------------------------------------------------------------------
    openStream() {
        const json = {
            id: this.formCodigo.get("codigoIngreso").value,
            idUser: +localStorage.getItem("id_user"),
            idEvent: 1
        }

        this.codigosService.validCodigo(JSON.stringify(json)).subscribe(
            (resp: any) => {
                localStorage.setItem("dghjoi3543u", resp.dghjoi3543u);
                this.router.navigate(['/stream']);
            }, error => {

            }
        )
    }

}