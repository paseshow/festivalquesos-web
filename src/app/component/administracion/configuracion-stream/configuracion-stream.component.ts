import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from '@models/evento';
import { EventoesService } from '@services/eventoes.service';
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

  constructor(
    private fb: FormBuilder,
    private eventoesService: EventoesService
  ) {
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
      active: this.formNewEvent.get("active").value
    };

    this.eventoesService.saveNewEvent(newEvent).subscribe(
      next => {

      }, error => {
        if (error.status == 201) {
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
  };

  // ---------------------------------------------------------------------------------------------
  // Editamos el evento, como parametro nos llega el indice del evento dentro del arreglo listEvent
  // ----------------------------------------------------------------------------------------------
  editEvent(i: number): void {
    debugger
  }

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

  codigosEvent(i: number): void {

  }

}
