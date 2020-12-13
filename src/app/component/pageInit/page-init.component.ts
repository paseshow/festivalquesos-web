import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoStream } from '@models/evento';
import { CodigosService } from '@services/codigos.service';
import { EventoesService } from '@services/eventoes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'page-init-app',
    templateUrl: 'page-init.component.html',
    styleUrls: ['page-init.component.scss']

})


export class PageInitComponent implements OnInit {

    EventosStream: EventoStream[];
    formCodigo: FormGroup;

    constructor(
        private fb: FormBuilder,
        private codigosService: CodigosService,
       // private router: Router,
        public toastr: ToastrService,
        private eventoesSerivce: EventoesService,
        private router: Router
    ) {
        this.EventosStream = [];
    }

    // toast(){
    //     this.toastr.success('somthing');
    // }

    ngOnInit() {
        this.buildForm();
        this.loadEventos();
    }

    //------------------------------------------
    // Obtenemos los eventos activos de la fecha
    //------------------------------------------
    loadEventos() {
        let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');

        this.eventoesSerivce.listEventActiveStream(fecha).subscribe(
            (next: EventoStream[]) => {
                next.forEach(unEvento => {
                    unEvento.fechaEvento = unEvento.fechaEvento.substring(11);
                });
                this.EventosStream = next;

            }, error => {

            });
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
            idEvent: this.EventosStream[0].idEvento,
        }

        this.codigosService.validCodigo(JSON.stringify(json)).subscribe(
            (resp: any) => {
                localStorage.setItem("dghjoi3543u", resp.dghjoi3543u);
                this.router.navigate(['/stream']);
                //this.toastr.info("Bienvenido");
                
            }, error => {
                console.error(error);
                this.toastr.error("Problemas en servidor");
           

            }
        )
    }

}