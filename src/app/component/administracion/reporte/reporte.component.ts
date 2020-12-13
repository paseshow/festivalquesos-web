import { Component, OnInit } from '@angular/core';
import { Evento } from '@models/evento';
import { CodigosService } from '@services/codigos.service';
import { EventoesService } from '@services/eventoes.service';
import { ExcelService } from '@services/excel.service';
import { FormularioInitService } from '@services/formularioInit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {


  listEvent: Evento[];
  idEventSelect: number;
  tipoReportValid: boolean;
  validDownloadReport: boolean;
  tipoReporte: string;
  loadReport: boolean;

  constructor(
    private eventoesService: EventoesService,
    private formulariosService: FormularioInitService,
    private codigosService: CodigosService,
    private excelService: ExcelService
  ) {
    this.listEvent = [];
    this.tipoReportValid = false;
    this.validDownloadReport = false;
    this.loadReport = false;
    this.tipoReporte = '';
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
      this.tipoReportValid = true;
    } else {
      this.tipoReportValid = false;
      this.validDownloadReport = false;
      this.loadReport = false;
    }
  };

  // -------------------------------------------------------------
  // Metodo que se dispara cuando se selecciona un tipo de reporte
  // para mostrar boton de descargar
  // -------------------------------------------------------------
  oncChangeSelectReporte(tipoReporte) {
    if (tipoReporte != 0) {
      switch (tipoReporte) {
        case "1":
          this.tipoReporte = "formulario";
          break;
        case "2":
          this.tipoReporte = "codigos";
          break;
        default:
          break;
      }
      this.validDownloadReport = true;
    } else {
      this.validDownloadReport = false;
    }
  };

  //--------------------------------------------------------------------------------------------------
  // Descargamos reporte en tipo xlxs.
  // Dependiendo de la seleccion de Tipo De Reporte, hacemos distintas peticiones
  // para Formularios cambiamos los campos de true/false (1/0) a si/no y eliminamos la columna idEvento
  // En el caso de error disparamos el metodo SwalError y le pasamos su respectivo error
  //----------------------------------------------------------------------------------------------------
  downloadReport(): void {
    this.loadReport = true;
    if (this.idEventSelect) {
      if (this.tipoReporte == "formulario") {
        this.formulariosService.reportFormByIdEvento(this.idEventSelect).subscribe(
          (formularios: any[]) => {
            if (formularios.length > 0) {
              formularios.forEach(unFormulario => {
                unFormulario.idCodigos = unFormulario.idCodigos.join();
                delete unFormulario.idevento;
                unFormulario.loaddb = unFormulario.loaddb == 1 ? 'si' : 'no';
                unFormulario.suscripcion = unFormulario.suscripcion == 1 ? 'si' : 'no';
              });

              this.exportAsXLSX(formularios, "Reporte_formularios_");
            } else {
              this.swalError("Formularios sin registro de ingreso a evento");
            }

          }, error => {
            this.swalError(error.error.error.descripcion);
            this.loadReport = false;
          }, () => {
            this.loadReport = false;
          });
      } else {
        this.codigosService.reportCodigosByIdevento(this.idEventSelect).subscribe(
          (ListaCodigos: any[]) => {
            this.exportAsXLSX(ListaCodigos, "Reporte_codigos_");
          }, error => {
            this.swalError(error.error.error.descripcion);
            this.loadReport = false;
          }, () => {
            this.loadReport = false;
          });
      }
    }
  };


  //-------------------------------------------------------------------------------------------------------
  // Metodo para realizar el excel y descargarlo
  // al metodo exportAsExcelFile: le pasamos el array de reesputa y el nombre del archivo que se descargara
  //-------------------------------------------------------------------------------------------------------
  exportAsXLSX(reporte: any[], fileName: string): void {
    if (reporte.length > 0) {
      this.excelService.exportAsExcelFile(reporte, fileName);
    } else {

    }
  };

  //-----------------------------------
  // Metodo para disparar msjes de error
  // @param mensaje de error a mostrar
  //------------------------------------
  swalError(msj: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `${msj}`,
      showConfirmButton: false,
      timer: 2000
    })
  }

}
