import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from '@models/evento';
import { EventoesService } from '@services/eventoes.service';

@Component({
  selector: 'app-configuracion-stream',
  templateUrl: './configuracion-stream.component.html',
  styleUrls: ['./configuracion-stream.component.scss']
})
export class ConfiguracionStreamComponent implements OnInit {


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

      }
    )
  };

  // ---------------------------------------------------------------------------------------------
  // Editamos el evento, como parametro nos llega el indice del evento dentro del arreglo listEvent
  // ----------------------------------------------------------------------------------------------
  editEvent(i: number): void {
    debugger
  }

}
