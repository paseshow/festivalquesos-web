import { Injectable } from '@angular/core';
import { JwtDTO } from '@models/user';
import { Marcas } from '../component/evento-stream/evento-stream.component';

@Injectable({ providedIn: 'root' })
export class CommonService {

    user: JwtDTO;
    config: boolean;
    menu: string[];

    marcas: Marcas[];

    constructor() {
        this.marcas = [];
        this.menu = [];
        this.cargarMarcas();
    }

    getConfig(): boolean {
        return this.config;
    }

    setConfig(config): void {
        this.config = config;
    }
    setUser(user): void {
        this.user = user;
    }

    getUser(): JwtDTO {
        return this.user;
    }

    getMarcas() {
        return this.marcas;
    }

    cargarMarcas() {
        for (let i = 0; i < 42; i++) {
            switch (i) {
                case 0:
                    this.marcas.push({
                        title: 'LOMBARDE',
                        direccion: 'Lisandro de la Torre 234 - Villa María',
                        telefono: '+54 9 353 418 4759 (Alvaro Ugartemendia)',
                        gmail: 'augartemendia@lacteoscds.com.ar',
                        link: 'https://www.lacteoscds.com.ar ',

                    });

                    break;
                case 1:
                    this.marcas.push({
                        title: 'EL TAMBO DON SANTIAGO',
                        direccion: 'Presidente Perón 798 - Calchín',
                        telefono: '351 6197887 (Mauro Bessone)/ 351 59028819 (Mario Bessone)',
                        gmail: 'mauro.bessone@eltambodonsantiago.com.ar  /  mario.bessone@eltambodonsantiago.com.ar',
                        link: 'www.eltambodonsantiago.com.ar',

                    });
                    break;
                case 2:
                    this.marcas.push({
                        title: 'MASTERLAC',
                        direccion: 'Mendoza 1881 - Monte Maíz',
                        telefono: '3468 646402 (Rodolfo Montechiari)',
                        gmail: 'rodolfomontechiari@gmail.com',
                        link: ''
                    });
                    break;

                case 3:
                    this.marcas.push({
                        title: 'LATTAY',
                        direccion: 'Av. Independencia 322 - Laboulaye',
                        telefono: '3385 598900 (Liliana Careri)/ 3385 598901 (Gustavo Careri)',
                        gmail: 'lcareri@hotmail.com',
                        link: ''
                    });
                    break;

                case 4:
                    this.marcas.push({
                        title: 'QUESADA',
                        direccion: 'Av.Gral Paz 682 - Benjamín Gould',
                        telefono: '54 9 3463 4545025 (Martín Fernandez)',
                        gmail: 'ventasquesada@hotmail.com',
                        link: ''
                    });
                    break;

                case 5:
                    this.marcas.push({
                        title: 'QUESCOR',
                        direccion: 'Ignacio Elorza 877 - Etruria',
                        telefono: '353 5087478 (Martín Ghigo)',
                        gmail: 'ventasquesada@hotmail.com',
                        link: 'www.quescor.com.ar'
                    });
                    break;

                case 6:
                    this.marcas.push({
                        title: 'LA VARENSE SRL',
                        direccion: 'Libertad 435 - Pozo del Molle',
                        telefono: '353 4270470 (Javier Baudino)',
                        gmail: 'javierbaudino@lavarense.com.ar',
                        link: 'www.lavarense.com.ar'
                    });
                    break;

                case 7:
                    this.marcas.push({
                        title: 'SANTA MARÍA',
                        direccion: 'Juan Venier 2099, Pque.Industrial - San Francisco',
                        telefono: '3492 414573 (Sebastián Peiretti)',
                        gmail: 'sebastianpeiretti@hotmail.com',
                        link: 'www.lacteossantamaria.com.ar'
                    });
                    break;

                case 8:
                    this.marcas.push({
                        title: 'LAS TRES ESTRELLAS',
                        direccion: 'Estados Unidos 122 - Villa María',
                        telefono: '353 4247244 (Sofía Carassai)',
                        gmail: 'administracion@lacteoslastres.com.ar',
                        link: 'www.lacteossantamaria.com.ar'
                    });
                    break;

                case 9:
                    this.marcas.push({
                        title: 'QUESO AZUL EMPERADOR',
                        direccion: 'Ruta Provincial 11 Km 136 - Ucacha',
                        telefono: '353 6568685 (Carlos Vázquez)',
                        gmail: 'cav_gruposavaz@hotmai.com',
                        link: 'https://www.quesoazulemperador.com/'
                    });
                    break;

                case 10:
                    this.marcas.push({
                        title: 'CAÑADA NEGRA',
                        direccion: 'Camino a Ticino km7 - Ucacha',
                        telefono: '353 5639875 (Sergio Chavez / gastón Barufaldi)',
                        gmail: 'schavez41@hotmail.com  /  sergio@ucalac.com.ar',
                        link: 'www.ucalac.com.ar'
                    });
                    break;

                case 11:
                    this.marcas.push({
                        title: 'RAGGIO DI SOLE',
                        direccion: 'Julio A. Roca 34 - Huanchilla',
                        telefono: '3584 15602027 (Hernán Guersi)',
                        gmail: 'hernanghersi@cthuanchilla.com.ar',
                        link: 'https://cotahua.com.ar/'
                    });
                    break;

                case 12:
                    this.marcas.push({
                        title: 'LEGENDARIO',
                        direccion: 'RN 158, Saturnino M.Laspiur (planta) - España 44, Las Varillas (punto venta)',
                        telefono: '351 2503773 (Jorge Martín Cavallero)',
                        gmail: 'legendarioquesos@gmail.com',
                        link: 'https://www.legendarioquesos.com/'
                    });
                    break;

                case 13:
                    this.marcas.push({
                        title: 'DOBLE A',
                        direccion: 'Libertad 378 - San Antonio de Litín',
                        telefono: '3537 671302 (Diego Castargno)',
                        gmail: 'dobleadiego@gmail.com  /  Castagnodiegom@hotmail.com',
                        link: ''
                    });
                    break;

                case 14:
                    this.marcas.push({
                        title: 'LACTEOS CASTEL',
                        direccion: 'Rta Nacional 19 km 234 - Arroyito',
                        telefono: '3576 15412106 (Rafael Mario Giordano)',
                        gmail: 'lacteoscastel@hotmail.com',
                        link: ''
                    });
                    break;

                case 15:
                    this.marcas.push({
                        title: 'LACTEOS TIO PUJIO SRL',
                        direccion: 'Zona Rural Tío Pujio Rta Nacional N°9 km 579,8 - Tío Pujio',
                        telefono: '353 4848269 (Osvaldo Audano) / 353 4848266  (Andrés Audano)',
                        gmail: 'compraslacteostiopujio@gmail.com',
                        link: 'http://lacteostiopujio.com.ar/'
                    });
                    break;

                case 16:
                    this.marcas.push({
                        title: 'EL JUMIAL',
                        direccion: 'Colón 344 - Pozo del Molle',
                        telefono: '353 4017476 (Hector alfredo Ricca)',
                        gmail: 'quesosregionales@hotmail.com',
                        link: ''
                    });
                    break;

                case 17:
                    this.marcas.push({
                        title: 'LINEA DORADA',
                        direccion: 'Ruta N10 Km 72 - Villa del Rosario',
                        telefono: '3573 456740 (Alejandro Marcato)',
                        gmail: 'info@lineadorada.com.ar',
                        link: 'http://www.lineadorada.com.ar/'
                    });
                    break;

                case 18:
                    this.marcas.push({
                        title: 'TONADITA',
                        direccion: 'Caudillos federales 1899 - Villa María',
                        telefono: '+54 9 353 6571525 (Gustavo Piazza)',
                        gmail: 'gustavopiazza@elcor.com.ar',
                        link: 'https://elcor.com.ar/'
                    });
                    break;

                case 19:
                    this.marcas.push({
                        title: 'ELOGIO',
                        direccion: 'Amado Aufranc 410 - Esperanza - Santa fe (administ.) ; Esc. Morelli sn, Las Varillas Cordoba (Planta Ind.) - Villa María',
                        telefono: '+54 9 3496 655223 (Carlos Mantegazza)',
                        gmail: 'marca.elogio@gmail.com',
                        link: 'https://elcor.com.ar/'
                    });
                    break;

                case 20:

                    break;

                case 21:

                    break;
                case 22:

                    break;

                case 23:

                    break;
                case 24:

                    break;

                case 25:

                    break;
                case 26:

                    break;

                case 27:

                    break;

                default:
                    break;
            }
        }
    }
}