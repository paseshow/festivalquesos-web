import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos-pasados',
  templateUrl: './eventos-pasados.component.html',
  styleUrls: ['./eventos-pasados.component.scss']
})
export class EventosPasadosComponent implements OnInit {

  anioEvento: string;
  anioEventoAntes: string;
  anioEventoDespues: string;
  eventos: any[];
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventos = [];
    this.anioEvento = "";
    this.determinarFotos();
  }

  ngOnInit(): void {
  }

  // -----------------------------------------------
  // Obtenemos el año del evento a visualizar y determinamos
  // el tamaño del arreglo de imagenes
  // -----------------------------------------
  determinarFotos(anio?: string): void {
    this.eventos = [];
    let anioRe;
    if (this.anioEvento != "") {
      anioRe = anio;
    } else {
      this.anioEvento = this.activateRoute.snapshot.params.anio;
      anioRe = this.anioEvento;
    }
    switch (anioRe) {
      case "2016":
        this.eventos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.anioEventoAntes = "2019";
        this.anioEventoDespues = "2017";
        this.anioEvento = "2016";
        break;

      case "2017":
        this.eventos = [1, 2, 3, 4, 5];
        /*7, 8, 9,
          10, 11, 12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25, 26, 27*/
        this.anioEventoAntes = "2016";
        this.anioEventoDespues = "2018";
        this.anioEvento = "2017";

        break;

      case "2018":
        this.eventos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
          , 11, 12];
        this.anioEventoAntes = "2017";
        this.anioEventoDespues = "2019";
        this.anioEvento = "2018";

        break;

      case "2019":
        this.eventos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.anioEventoAntes = "2018";
        this.anioEventoDespues = "2016";
        this.anioEvento = "2019";
        break;
      default:
        break;
    }
  };


  cambioEvento(anioADirigir): void {
    this.router.navigate(['/stream/eventos', anioADirigir]);
    this.determinarFotos(anioADirigir);
  };
}
