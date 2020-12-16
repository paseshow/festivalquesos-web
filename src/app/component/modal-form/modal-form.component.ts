import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '@models/formulario';
import { EventoesService } from '@services/eventoes.service';
import { FormularioInitService } from '@services/formularioInit.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild("container") templateModal: ElementRef;

  //myInput: FormControl = new FormControl('');
  modalForm: FormGroup
  submitted = false;
  buttonCloseModal: any;
  estreno: boolean

  constructor(
    private formBuilder: FormBuilder,
    private formularioInitService: FormularioInitService,
    public toastr: ToastrService,
    private eventoesSerivce: EventoesService
  ) {
    this.estreno = true;
  }

  ngAfterViewInit(): void {
    ($('#modalFormInit') as any).modal('show');

  }

  get fm() { return this.modalForm.controls; }

  ngOnInit(): void {

    this.modalForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})")]],
      selectSector: ['', Validators.required],
      loaddb: [true],
    });

    this.contador();
  };

  // ---------------------------------------------------------------
  // Validacion de campos requeridos en el formulario modalForm
  // Guardamos los datos con el servicio y cuando se haya guardado
  // correctamente, obtenemos los eventos que estan activos en el dia
  // ----------------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    if (this.modalForm.valid) {

      const form = new Formulario();

      form.nombre = this.modalForm.get("nombre").value;
      form.apellido = this.modalForm.get("apellido").value;
      form.email = this.modalForm.get("email").value;
      form.telefono = this.modalForm.get("phone").value;
      form.loaddb = this.modalForm.get("loaddb").value;
      form.tipoSector = this.modalForm.get("selectSector").value;

      // guardamos el formulario y la respuesta del back, también guardamos el id del usuario.
      this.formularioInitService.addForm(form).subscribe(
        (resp: Formulario) => {
          localStorage.setItem("id_user", resp.id.toString());
        }, error => {
          console.error("Error en modal form:", error)
          this.toastr.error("Ups, parece que hubo un problema, aguarde un momento");

        });
      return;
    }
  };

  ngOnDestroy(): void {
    ($('.modal-backdrop') as any).remove();
  }

  contador() {
    //var fecha = new Date(2020, 11, 16, 20, 15, 0);
    var fecha = new Date(2020, 11, 15, 21, 22, 0);
    var hoy = new Date();
    var dias = 0
    var horas = 0
    var minutos = 0
    var segundos = 0
    if (fecha >= hoy) {
      var diferencia = (fecha.getTime() - hoy.getTime()) / 1000
      dias = Math.floor(diferencia / 86400)
      diferencia = diferencia - (86400 * dias)
      horas = Math.floor(diferencia / 3600)
      diferencia = diferencia - (3600 * horas)
      minutos = Math.floor(diferencia / 60)
      diferencia = diferencia - (60 * minutos)
      segundos = Math.floor(diferencia)
      document.getElementById("contador").innerHTML = "" + dias + " : " + horas + " : " + minutos + " : " + segundos;
      if (dias >= 0 || horas >= 0 || minutos >= 0 || segundos >= 0) {
        setTimeout(() => {
          this.contador();
        }, 1000)
      }
    }
    else {
      this.estreno = false;
      //document.getElementById("contador").innerHTML = "0 Días ¡Comenzo el Mundial Brasil 2014!";
    }
  }
}