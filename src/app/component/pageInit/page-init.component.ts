import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoStream } from '@models/evento';
import { CodigosService } from '@services/codigos.service';
import { CommonService } from '@services/common.service';
import { EventoesService } from '@services/eventoes.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: 'page-init-app',
    templateUrl: 'page-init.component.html',
    styleUrls: ['page-init.component.scss']

})


export class PageInitComponent implements OnInit {


    @ViewChild('modalCodigo', { static: false }) modalCodigo: ElementRef;

    EventosStream: EventoStream[];
    formCodigo: FormGroup;
    msjErrorValidCodigo: string;
    yaRegistrado: boolean;

    constructor(
        private fb: FormBuilder,
        private codigosService: CodigosService,
        // private router: Router,
        public toastr: ToastrService,
        private eventoesSerivce: EventoesService,
        private commonService: CommonService,
        private router: Router
    ) {
        this.EventosStream = [];
        this.msjErrorValidCodigo = '';
        this.yaRegistrado = true;
    }

    // toast(){
    //     this.toastr.success('somthing');
    // }

    ngOnInit() {
        this.buildForm();
        this.loadEventos();
        this.validRegistro();
    }

    //------------------------------------------
    // Obtenemos los eventos activos de la fecha
    //------------------------------------------
    loadEventos() {
        let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');

        this.eventoesSerivce.listEventActiveStream(fecha).subscribe(
            (next: EventoStream[]) => {
                next.forEach(unEvento => {
                    let horaEvento = unEvento.fechaEvento.substring(11);
                    unEvento.fechaEvento = horaEvento;
                });
                this.EventosStream = next;
            }, error => {
                console.error("Error en page init component:", error);
                this.toastr.error("Ups, parece que hubo un problema, aguarde un momento");

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

    validRegistro() {
        if (localStorage.getItem("id_user").length > 0) {
            this.yaRegistrado = false;
        }
    }

    //---------------------------------------------------------------------------------------------------------
    // Validamos la fecha y si el codigo que se ingresa corresponde al evento seleccionado.
    // Si estas validaciones se afirman, obtendremos los links de stream y de chat si es que se haya habilitado
    //---------------------------------------------------------------------------------------------------------
    openStream(i: number): void {
        let DateHoy = formatDate(new Date(), 'yyyy-MM-dd HH:mm a', 'en');

        let horaHoy = DateHoy.substring(11, 16);
        horaHoy = horaHoy.replace(":", "");
        let url;
        let hora = +horaHoy;
        let horaEvento = +this.EventosStream[i].fechaEvento.replace(":", "");
        if (hora >= horaEvento) {
            url = "festival";
            const json = {
                id: this.formCodigo.get("codigoIngreso").value,
                idUser: +localStorage.getItem("id_user"),
                idEvent: this.EventosStream[i].idEvento,
            }
            if (i == 1) {
                json.id = 1;
                url = "quesos"
            }
            this.codigosService.validCodigo(JSON.stringify(json)).subscribe(
                (resp: any) => {
                    localStorage.setItem("codigos", json.id);
                    localStorage.setItem("dghjoi3543u", resp.dghjoi3543u);
                    if (resp.chat != "true")
                        localStorage.setItem("chat", resp.chat);
                    this.modalCodigo.nativeElement.click();
                    this.commonService.setUrl(url);
                    this.router.navigate([`/stream/`, url]);
                }, error => {

                    let errorJson = JSON.parse(JSON.stringify(error));
                    this.msjErrorValidCodigo = errorJson.error.error.descripcion;
                }
            )
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El evento aún no esta disponible!',
                showConfirmButton: false,
                timer: 1500
            });
            this.formCodigo.setValue({
                codigoIngreso: ''
            });
            this.modalCodigo.nativeElement.click();
        }
    }

}