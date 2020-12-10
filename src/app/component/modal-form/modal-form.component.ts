import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '@models/formulario';
import { FormularioInitService } from '@services/formularioInit.service';
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements AfterViewInit, OnInit {

  @ViewChild("container") templateModal: ElementRef;

  //myInput: FormControl = new FormControl('');
  modalForm: FormGroup
  submitted = false;
  buttonCloseModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private formularioInitService: FormularioInitService
  ) { }

  ngAfterViewInit(): void {
    ($('#modalFormInit') as any).modal('show');

  }

  get fm() { return this.modalForm.controls; }

  ngOnInit(): void {

    this.modalForm = this.formBuilder.group({
      completeName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      question: ['', [Validators.required, Validators.minLength(4)]],
      loaddb: [true],
      suscripcion: [true]
    });

  }

  // ----------------------------------------------------------
  // Validacion de campos requeridos en el formulario modalForm
  // ----------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    if (this.modalForm.valid) {

      const form = new Formulario();

      form.nombre = this.modalForm.get("completeName").value;
      form.email = this.modalForm.get("email").value;
      form.telefono = this.modalForm.get("phone").value;
      form.descripcionentrada = this.modalForm.get("question").value;
      form.loaddb = this.modalForm.get("loaddb").value;
      form.suscripcion = this.modalForm.get("suscripcion").value;

      // guardamos el formulario y la respuesta del back guardamos el id del usuario.
      this.formularioInitService.addForm(form).subscribe(
        (resp: Formulario) => {
          localStorage.setItem("id_user", resp.id.toString());
        }, error => {

        }
      )

      return;
    }
  };




}
