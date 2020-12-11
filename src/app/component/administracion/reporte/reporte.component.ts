import { Component, OnInit } from '@angular/core';
import { Evento } from '@models/evento';
import { EventoesService } from '@services/eventoes.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {


  listEvent: Evento[];
  idEventSelect: number;
  tipoReport: boolean;
  validDownloadReport: boolean;

  constructor(
    private eventoesService: EventoesService
  ) {
    this.listEvent = [];
    this.tipoReport = false;
    this.validDownloadReport = false;
  }

  ngOnInit(): void {
    this.loadListEvent();
  }

  // ----------------------------------------------------------------------
  // Obtenemos los eventos que estan en el servidor para formar el selector
  // ----------------------------------------------------------------------
  loadListEvent(): void {
    this.eventoesService.listAll().subscribe(
      (next: Evento[]) => {
        this.listEvent = next;
      }, error => {

      });
  };

  // ------------------------------------------------------------
  // Metodo que se dispara cuando el usuario selecciona un evento
  // Para mostrar opciones siguientes
  // ------------------------------------------------------------
  onChangeSelect(idEventSelect) {
    if (idEventSelect != 0) {
      this.idEventSelect = idEventSelect;
      this.tipoReport = true;
    } else {
      this.tipoReport = false;
      this.validDownloadReport = false;
    }
  };

  // -------------------------------------------------------------
  // Metodo que se dispara cuando se selecciona un tipo de reporte
  // para mostrar boton de descargar
  // -------------------------------------------------------------
  oncChangeSelectReporte(tipoReporte) {
    if (tipoReporte != 0) {
      this.validDownloadReport = true;
    } else {
      this.validDownloadReport = false;
    }
  }

}
