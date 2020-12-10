import { Component, OnInit } from '@angular/core';
import * as CryptoJS from "crypto-js";
import * as Plyr from "plyr";

@Component({
  selector: 'app-evento-stream',
  templateUrl: './evento-stream.component.html',
  styleUrls: ['./evento-stream.component.scss']
})
export class EventoStreamComponent implements OnInit {

  urlStream: string;
  esHoraShow: boolean;
  opcionesReproductor: Plyr.Options;
  sourceVideo: Plyr.Source[];

  constructor() {
    this.urlStream = '';
    this.opcionesReproductor = {
      clickToPlay: false,
      fullscreen: { enabled: false, fallback: false, iosNative: false },
      controls: [],
      keyboard: { focused: false, global: false },
      youtube: { noCookie: false },
    };
  }

  // ---------------------------------------
  // Validamos la ocupacion del localStorage
  // ---------------------------------------
  ngOnInit(): void {

    if (localStorage.length > 1) {
      this.urlStream = localStorage.getItem("enc");

      const fechaActual = new Date().getTime();

      this.esHoraShow = false;
      if (this.urlStream) {
        this.urlStream = this.desencriptarUrl(this.urlStream);
        this.comenzarStream(this.urlStream);
      }

    }
  };

  // -----------------------------------
  // Desencriptamos el codigo del stream
  // @param: Url encriptada
  // -----------------------------------
  desencriptarUrl(urlEncrypt: string): string {

    const KEY = CryptoJS.enc.Utf8.parse("6DwRNHTN4zQZDeE9");
    const IV = CryptoJS.enc.Utf8.parse("A5r9jDbJtk4YjT2C");

    const DECRYPTED = CryptoJS.AES.decrypt(urlEncrypt, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return DECRYPTED.toString(CryptoJS.enc.Utf8);
  };

  // --------------------------------------------------
  // Configuramos libreria para comenzar la transmision
  // @params: url del stream (desencriptada)
  // --------------------------------------------------
  comenzarStream(urlStream: string, controles?: string[]): void {

    this.opcionesReproductor = {
      clickToPlay: this.esHoraShow,
      fullscreen: { enabled: true, fallback: true, iosNative: false },
      controls: controles
        ? controles
        : [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "airplay",
          "fullscreen",
        ],
      keyboard: { focused: this.esHoraShow, global: this.esHoraShow },
      autoplay: true,
      loop: { active: !this.esHoraShow },
      youtube: { noCookie: false },
    };

    this.sourceVideo = [
      {
        src: urlStream,
        provider: "youtube",
      },
    ];
  };

  //----------------------------------
  // Metodo propio de la libreria Plyr
  //----------------------------------
  played(event: Plyr.PlyrEvent) { }

}
