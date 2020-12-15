import { Identifiers } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@services/common.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import * as CryptoJS from "crypto-js";
import * as Plyr from "plyr";


export class Marcas {
  title: string;
  gmail: string;
  direccion: string;
  link: string;
};

@Component({
  selector: 'app-evento-stream',
  templateUrl: './evento-stream.component.html',
  styleUrls: ['./evento-stream.component.scss']
})
export class EventoStreamComponent implements OnInit {


  @ViewChild("btnChat", { static: false }) btnChat: ElementRef;
  @ViewChild("inicio") seccionInicio: Identifiers;

  urlStream: string;
  esHoraShow: boolean;
  opcionesReproductor: Plyr.Options;
  reproductor: Plyr;
  sourceVideo: Plyr.Source[];
  marcas: Marcas[];
  urlChatAux: string;
  urlChat: SafeUrl;
  msjBtnChat: string;
  enabledChat: boolean;
  chatEnable2: boolean;
  chatEnable: boolean;
  loggedIn: boolean;
  url: boolean;
  element: any;


  constructor(
    private commonService: CommonService,
    private sanitizationService: DomSanitizer,
    private authSocialService: SocialAuthService,
    private router: Router,
  ) {
    this.marcas = [];
    this.enabledChat = false;
    this.chatEnable = true;
    this.chatEnable2 = true;
    this.msjBtnChat = '';
    this.urlChat = '';
    this.urlChat = '';
    this.urlStream = '';
    this.reproductor = new Plyr("#player");
    this.opcionesReproductor = {
      clickToPlay: false,
      fullscreen: { enabled: false, fallback: false, iosNative: false },
      controls: [],
      keyboard: { focused: false, global: false },
      youtube: { noCookie: false },
    };
    this.loadCatalogosMarca();
    if (this.commonService.getUrl() == "festival") {
      this.url = false;
    } else {
      this.url = true;
    }
  }

  scroll(element: HTMLElement) {
    element.scrollIntoView()
  };

  // ---------------------------------------
  // Validamos la ocupacion del localStorage
  // ---------------------------------------
  ngOnInit(): void {

    if (localStorage.length > 1) {
      this.urlStream = localStorage.getItem("dghjoi3543u");
      this.urlChatAux = localStorage.getItem("chat");
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
    this.esHoraShow = true;
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


    if (this.urlChatAux != "undefined") {
      this.enabledChat = true;
      this.authSocialService.authState.subscribe(user => this.loggedIn = user != null)
      //si urlChat es true, el chat esta activo pero no tiene link.
      //Formamos link de chat con el id del video de stream
      if (this.urlChatAux == "true") {
        this.urlChat = this.sanitizationService.bypassSecurityTrustResourceUrl(
          "https://www.youtube.com/live_chat?v=" +
          urlStream +
          "&embed_domain=" +
          window.location.hostname +
          "&dark_theme=1"
        );
      } else {
        this.urlChat = this.sanitizationService.bypassSecurityTrustResourceUrl(
          this.urlChatAux +
          "&embed_domain=" +
          window.location.hostname +
          "&dark_theme=1"
        );
      }
    }
  };

  //----------------------------------
  // Metodo propio de la libreria Plyr
  //----------------------------------
  played(event: Plyr.PlyrEvent) {
  };

  // ----------------------------------------------
  // Creamos arreglo de marcas , cargando los datos
  // ----------------------------------------------
  loadCatalogosMarca(): void {
    this.marcas = this.commonService.getMarcas();
  }

  // ----------------------------------------------------------------------------
  // metodo que se utiliza para que cuando el usuario quiere usar el chat, primero
  // se loguea por una cuenta de gmail de google para que obtenga su usuario de youtube
  // ---------------------------------------------------------------------------------
  loginGoogle(): void {
    if (this.chatEnable) {
      if (this.chatEnable2) {
        this.chatEnable2 = false;
        this.chatEnable = false;
        this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.btnChat.nativeElement.style.backgroundColor = "red";
        this.msjBtnChat = "Salir del chat";
      } else {
        this.msjBtnChat = "Salir del chat";
        this.loggedIn = true;
        this.btnChat.nativeElement.style.backgroundColor = "red";
        this.chatEnable = false;
      }
    } else {
      this.chatEnable = true;
      this.loggedIn = false;
      this.btnChat.nativeElement.style.backgroundColor = "#e8be33";
      this.msjBtnChat = "Ingresar al chat";
    }
  };

  // --------------------------------------------------------
  // Metodo que realiza la redireccion al carousel de edicion
  // determinando que año se clikeo
  // --------------------------------------------------------
  redirigirEvento(año: number) {
    this.router.navigate(['stream/eventos', año.toString()]);
  }

}
