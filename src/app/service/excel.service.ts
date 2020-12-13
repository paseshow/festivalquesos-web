import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    const stringFecha: string = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
    FileSaver.saveAs(data, fileName + stringFecha + EXCEL_EXTENSION);
  }

  /** Convierte un archivo xlsx a formato Object */
  public convertExcelToJson(file: File): Promise<any[]> {
    let reader = new FileReader();
    let workbookkk: XLSX.WorkBook;

    reader.readAsBinaryString(file);

    return new Promise((resolve, reject) => {
      reader.onload = function () {
        let data = reader.result;
        let XL_row_object;
        workbookkk = XLSX.read(data, { type: "binary" });

        // Esta funcion permite leer todas las hojas de una planilla
        // workbookkk.SheetNames.forEach(function (sheetName) {
        //   if (workbookkk.Sheets[sheetName]) {
        //     XL_row_object = utils.sheet_to_json(
        //       workbookkk.Sheets[sheetName]
        //     );
        //   }

        // Esto estaba comentado de antes
        // const json_object = JSON.stringify(XL_row_object);
        //  console.log(json_object);
        // });

        // Funcion para leer la primera hoja de una planilla de calculo
        if (workbookkk.SheetNames[0]) {
          XL_row_object = XLSX.utils.sheet_to_json(workbookkk.Sheets[workbookkk.SheetNames[0]]);
        }

        if (!XL_row_object.length) {
          reject({ err: "No se pudieron procesar los datos del archivo" });
        }
        resolve(XL_row_object);
      };
    });
  }
}
