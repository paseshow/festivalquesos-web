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

  constructor(
    private formBuilder: FormBuilder,
    private formularioInitService: FormularioInitService,
    public toastr: ToastrService,
    private eventoesSerivce: EventoesService
  ) { }

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
      question: ['', [Validators.required, Validators.minLength(4)]],
      loaddb: [true],
      suscripcion: [true],
    });
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
      form.descripcionentrada = this.modalForm.get("question").value;
      form.loaddb = this.modalForm.get("loaddb").value;
      form.tipoSector = this.modalForm.get("selectSector").value;
      form.suscripcion = this.modalForm.get("suscripcion").value;
      //form.idEvento

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
}