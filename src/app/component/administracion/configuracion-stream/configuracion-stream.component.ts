import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from '@models/evento';
import { EventoesService } from '@services/eventoes.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-configuracion-stream',
  templateUrl: './configuracion-stream.component.html',
  styleUrls: ['./configuracion-stream.component.scss']
})
export class ConfiguracionStreamComponent implements OnInit {

  @ViewChild('modal', { static: false }) modal: ElementRef;
  listEvent: Evento[];
  formNewEvent: FormGroup;
  tituloModal: string;
  isEdit: boolean;
  idEvento: number;

  constructor(
    private fb: FormBuilder,
    private eventoesService: EventoesService,
    private route: Router,
    public toastr: ToastrService
    
  ) {
    this.idEvento = 0;
    this.tituloModal = "Nuevo Evento";
    this.isEdit = false;
  }

  ngOnInit(): void {
    this.loadEvents();
    this.buildFormNewEvent();
  }

  // ----------------------------------------------------------------
  // Al inicializar el componente , cargamos los eventos del servidor
  // ----------------------------------------------------------------
  loadEvents(): void {
    this.eventoesService.listAll().subscribe(
      (next: Evento[]) => {
        this.listEvent = next;
        this.listEvent.forEach(anEvent => {
          anEvent.active = anEvent.active ? 'Si' : 'No';
        })
      }, error => {
        console.error(error);
        this.toastr.error("Problemas en servidor");

      }
    );
  };

  // ------------------------------------------------------
  // Inicializamos el formulario para crear un nuevo evento
  // ------------------------------------------------------
  buildFormNewEvent(): void {
    this.formNewEvent = this.fb.group({
      nameEvent: ['', [Validators.required]],
      linkEvent: ['', [Validators.required]],
      fechaEvento: ['', [Validators.required]],
      active: [false]
    });
  };


  // -------------------------
  // Guardamos un nuevo evento
  // -------------------------
  saveEvento() {
    let newEvent = {
      nameEvent: this.formNewEvent.get("nameEvent").value,
      linkEvent: this.formNewEvent.get("linkEvent").value,
      fechaEvent: this.formNewEvent.get("fechaEvento").value,
      active: this.formNewEvent.get("active").value
    };

    if (this.isEdit) {
      this.eventoesService.updateEvent(newEvent, this.idEvento).subscribe(
        next => {

        }, error => {
          if (error.status == 200) {
            this.modal.nativeElement.click();
            this.loadEvents();
            this.cleanForm();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Evento actualizado con exito!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });

    } else {
      this.eventoesService.saveNewEvent(newEvent).subscribe(
        next => {

        }, error => {
          if (error.status == 201) {
            this.cleanForm();

            this.modal.nativeElement.click();
            this.loadEvents();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Evento guardado con exito!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    }
  };

  // ---------------------------------------------------------------------------------------------
  // Editamos el evento, como parametro nos llega el indice del evento dentro del arreglo listEvent
  // ----------------------------------------------------------------------------------------------
  editEvent(i: number): void {
    this.tituloModal = "Editar Evento";
    this.isEdit = true;
    this.idEvento = this.listEvent[i].id;

    this.eventoesService.getEventoById(this.idEvento).subscribe(
      (next: Evento) => {
        this.formNewEvent.setValue({
          nameEvent: next.nameEvent,
          linkEvent: next.linkEvent,
          fechaEvento: next.fechaEvent,
          active: next.active
        })
      }, error => {
        console.log("Error en getEventoById", error);
        this.toastr.error("Problemas en servidor");

      });
  };

  // -------------------------------------------------------------------------------------
  // Buscamos el id del respectivo evento con el indice que trae de parametro y eliminamos
  // -------------------------------------------------------------------------------------
  deletEvent(i: number): void {

    let idEvento = this.listEvent[i].id;

    Swal.fire({
      title: '¿Seguro que quiere eliminar esté evento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.eventoesService.deleteEvent(idEvento).subscribe(
          next => {

          }, (error: Response) => {
            if (error.status == 201) {
              this.loadEvents();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Evento eliminado!',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      }
    })
  };


  // -----------------------------------------------------------------------------------------
  // Redirigimos hacia el modal evento para poder cargar los codigos correspondiente al evento
  // -----------------------------------------------------------------------------------------
  codigosEvent(i: number): void {

    this.route.navigate([this.route.url, 'codigos']);

  }

  closeModal() {
    this.modal.nativeElement.click();
    this.tituloModal = "Nuevo Evento";
    this.cleanForm();
  };

  // ------------------------------
  // Metodo para limpiar formulario
  // ------------------------------
  cleanForm() {
    this.formNewEvent.setValue({
      nameEvent: '',
      linkEvent: '',
      fechaEvento: '',
      active: ''
    });
  }

}
