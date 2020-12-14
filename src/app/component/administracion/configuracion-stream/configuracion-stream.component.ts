import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CodigosLoad } from '@models/codigos';
import { Evento } from '@models/evento';
import { CodigosService } from '@services/codigos.service';
import { EventoesService } from '@services/eventoes.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-configuracion-stream',
  templateUrl: './configuracion-stream.component.html',
  styleUrls: ['./configuracion-stream.component.scss']
})
export class ConfiguracionStreamComponent implements OnInit {

  data: AOA = [[1, 2], [3, 4]];

  @ViewChild('modal', { static: false }) modal: ElementRef;
  @ViewChild('inputExcel', { static: false }) inputExcel: ElementRef;
  listEvent: Evento[];
  formNewEvent: FormGroup;
  tituloModal: string;
  isEdit: boolean;
  idEvento: number;


  constructor(
    private fb: FormBuilder,
    private eventoesService: EventoesService,
    private codigosService: CodigosService,
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
      linkChat: [''],
      activeChat: [false],
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
      linkChat: this.formNewEvent.get("linkChat").value,
      activeChat: this.formNewEvent.get("activeChat").value ? true : false,
      fechaEvent: this.formNewEvent.get("fechaEvento").value,
      active: this.formNewEvent.get("active").value ? true : false
    };

    if (this.isEdit) {
      this.eventoesService.updateEvent(newEvent, this.idEvento).subscribe(
        next => {

        }, error => {
          if (error.status == 200) {
            this.modal.nativeElement.click();
            this.loadEvents();
            this.cleanForm();
            this.swalExit("Evento actualizado con exito!");
          }
        });
      this.isEdit = false;

    } else {
      this.eventoesService.saveNewEvent(newEvent).subscribe(
        next => {

        }, error => {
          if (error.status == 201) {
            this.cleanForm();

            this.modal.nativeElement.click();
            this.loadEvents();
            this.swalExit("Evento guardado con exito!");
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
          linkChat: next.linkChat,
          activeChat: next.activeChat,
          fechaEvento: next.fechaEvent,
          active: next.active
        })
      }, error => {

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
              this.swalExit("Evento eliminado!");
            }
          });
      }
    })
  };

  // ----------------------------------------------
  // Metodo para mostrar msj de exito con swal fire
  // -----------------------------------------------
  swalExit(msj: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${msj}`,
      showConfirmButton: false,
      timer: 1500
    });
  }

  // -----------------------------------------------------------------------------------------
  // Redirigimos hacia el modal evento para poder cargar los codigos correspondiente al evento
  // -----------------------------------------------------------------------------------------
  codigosEvent(i: number): void {
    this.idEvento = this.listEvent[i].id;
    this.inputExcel.nativeElement.click();
  }

  closeModal() {
    this.modal.nativeElement.click();
    this.tituloModal = "Nuevo Evento";
    this.cleanForm();
  };

  // ------------------------------
  // Metodo para limpiar formulario
  // ------------------------------
  cleanForm(): void {
    this.formNewEvent.setValue({
      nameEvent: '',
      linkEvent: '',
      linkChat: '',
      activeChat: false,
      fechaEvento: '',
      active: false
    });
  };


  //-----------------------------------------------------------------------------------
  // Leemos el excel y guardamos en un arreglo, donde el primer elemento son los titulos
  // de las columnas
  //------------------------------------------------------------------------------------
  onFileChange(event) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.ordenarDatos(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  };


  // -----------------------------------------------------
  // Ordenamos los datos del excel previamente establecido
  // recorremos el arreglo(padre) dataCodigos que dentro de el es otro arreglo(hijo)
  // donde el arreglo hijo cada elemento corresponde a cada columna del excel
  // creamos nueva variable (arreglo) siguiendo el modelo de CodigosLoad, seteandolo por default
  // el id del evento que se selecciono
  // terminando el metodo realizamos la peticion guardando los datos
  // -----------------------------------------------------
  ordenarDatos(datosCodigos: any[]): void {
    let loadCodigos: CodigosLoad[] = [];
    for (let i = 1; i < datosCodigos.length; i++) {
      let etiqueta: string = "";
      let codigo: number = 0;
      datosCodigos[i].forEach((element, index) => {
        switch (index) {
          case 0:
            etiqueta = element;
            break;
          case 1:
            codigo = element;
            break;
          default:
            break;
        }
      });
      loadCodigos.push({
        etiqueta: etiqueta,
        id: codigo,
        idEvento: this.idEvento
      });
    }

    if (loadCodigos) {
      this.codigosService.loadCodigos(loadCodigos).subscribe(
        resp => {
          this.swalExit("Codigos cargado con exito!");
        }, error => {

        });
    }
  };

}
