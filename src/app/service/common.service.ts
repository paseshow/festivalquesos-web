import { Injectable } from '@angular/core';
import { Formulario } from '@models/formulario';
import { JwtDTO } from '@models/user';
import { Marcas } from '../component/evento-stream/evento-stream.component';

@Injectable({ providedIn: 'root' })
export class CommonService {

    user: JwtDTO;
    config: boolean;
    menu: string[];
    marcas: Marcas[];
    url: string;
    codigos: number;

    constructor() {
        this.url = '';
        this.marcas = [];
        this.menu = [];
        this.cargarMarcas();
    }

    getCodigos(): number {
        return this.codigos;
    }

    setCodigos(codigos) {
        this.codigos = codigos;
    }

    getUrl(): string {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
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
                        title: 'ARROYO CABRAL / ESTILO REAL',
                        direccion: 'Rivadavia y E. Piacenza - Arroyo Cabral',
                        gmail: 'mpautasso@cooparroyocabral.com.ar',
                        link: 'https://www.facebook.com/cooparroyocabral'
                    });
                    break;
                case 1:
                    this.marcas.push({
                        title: 'CAÑADA NEGRA / ESNAOLA',
                        direccion: 'Camino a Ticino km7 - Ucacha',
                        gmail: 'schavez41@hotmail.com  /  sergio@ucalac.com.ar',
                        link: 'https://www.facebook.com/Ucalac'
                    });
                    break;
                case 2:
                    this.marcas.push({
                        title: 'CASTEL',
                        direccion: 'Rta Nacional 19 km 234 - Arroyito',
                        gmail: 'lacteoscastel@hotmail.com',
                        link: ''
                    });
                    break;

                case 3:
                    this.marcas.push({
                        title: 'CAYELAC',
                        direccion: 'Vélez Sarsfield 43 - Las Varas',
                        gmail: 'info@cayelac.com.ar',
                        link: 'https://www.facebook.com/Cayelac-112995440343466/'
                    });
                    break;

                case 4:
                    this.marcas.push({
                        title: 'COOPERATIVA LECHERA EL FORTÍN LTDA',
                        direccion: 'Bv. Horacio Shedden 335 - El Fortín',
                        gmail: 'clef.elfortin@gmail.com',
                        link: ''
                    });
                    break;

                case 5:
                    this.marcas.push({
                        title: 'CRELECH',
                        direccion: 'Las Heras 899 - Laborde',
                        gmail: 'dulceracordobesa@hotmail.com',
                        link: ''
                    });
                    break;

                case 6:
                    this.marcas.push({
                        title: 'CREMAC',
                        direccion: 'Urquiza 320 - San Marcos Sud',
                        gmail: 'guillermo@sobreroycagnolo.com.ar',
                        link: ''
                    });
                    break;

                case 7:
                    this.marcas.push({
                        title: 'DOBLE A',
                        direccion: 'Libertad 378 - San Antonio de Litín',
                        gmail: 'dobleadiego@gmail.com  /  Castagnodiegom@hotmail.com',
                        link: ''
                    });
                    break;

                case 8:
                    this.marcas.push({
                        title: 'DUY AMIS',
                        direccion: 'Tucumán 1644 - Villa María',
                        gmail: 'administracion@donemiliosrl.com.ar',
                        link: 'https://www.facebook.com/DUYAMISLACTEOS/'
                    });
                    break;

                case 9:
                    this.marcas.push({
                        title: 'EL JUMIAL',
                        direccion: 'Colón 344 - Pozo del Molle',
                        gmail: 'quesosregionales@hotmail.com',
                        link: ''
                    });
                    break;

                case 10:
                    this.marcas.push({
                        title: 'EL MILAGRO',
                        direccion: 'Rivadavia 40 - Devoto',
                        gmail: 'elmilagrosrl@gmail.com',
                        link: ''
                    });
                    break;

                case 11:
                    this.marcas.push({
                        title: 'EL TAMBO DON SANTIAGO',
                        direccion: 'Presidente Perón 798 - Calchín',
                        gmail: 'mauro.bessone@eltambodonsantiago.com.ar  /  mario.bessone@eltambodonsantiago.com.ar',
                        link: 'http://eltambodonsantiago.com.ar/',
                    });
                    break;

                case 12:
                    this.marcas.push({
                        title: 'ELOGIO',
                        direccion: 'Esc. Morelli sn, Las Varillas Cordoba (Planta Ind.)',
                        gmail: 'marca.elogio@gmail.com',
                        link: ''
                    });
                    break;

                case 13:
                    this.marcas.push({
                        title: 'IDEONI',
                        direccion: 'Sarmiento 220 - Carrilobo',
                        gmail: 'lacideoni@gmail.com',
                        link: ''
                    });
                    break;

                case 14:
                    this.marcas.push({
                        title: 'INTELAC',
                        direccion: 'Ruta Nacional 158 Km 101.5 - Pozo del Moller',
                        gmail: 'administracion@intelac.com.ar',
                        link: ''
                    });
                    break;

                case 15:
                    this.marcas.push({
                        title: 'LA BOHEME',
                        direccion: 'Rivadavia 476 - Arroyo Cabral',
                        gmail: 'info@quesosespeciales.com',
                        link: 'https://www.facebook.com/quesosespeciales'
                    });
                    break;

                case 16:
                    this.marcas.push({
                        title: 'LA CRISTINA',
                        direccion: 'Av. Gral. Savio 3500 - Villa María',
                        gmail: 'jgonzalez@lcsuero.com',
                        link: ''
                    });
                    break;

                case 17:
                    this.marcas.push({
                        title: 'LA FARFALLA',
                        direccion: 'Larroque 1532 - Banfield',
                        gmail: 'creditos@lacteoslafarfalla.com.ar',
                        link: 'https://www.facebook.com/lacteoslafarfalla'
                    });
                    break;

                case 18:
                    this.marcas.push({
                        title: 'LA NUEVA',
                        direccion: 'Ruta Nacional N° 9 - Km 657 - Pilar',
                        gmail: 'administracion@lacteoslanueva.com.ar',
                        link: 'https://www.facebook.com/LaNuevaLacteos/'
                    });
                    break;

                case 19:
                    this.marcas.push({
                        title: 'LA VARENSE SRL',
                        direccion: 'Libertad 435 - Pozo del Molle',
                        gmail: 'javierbaudino@lavarense.com.ar',
                        link: ''
                    });
                    break;

                case 20:
                    this.marcas.push({
                        title: 'LACTEAR',
                        direccion: 'Italia 894 - Morteros',
                        gmail: 'adm@lactear.com',
                        link: 'https://www.facebook.com/lactear'
                    });
                    break;

                case 21:
                    this.marcas.push({
                        title: 'LÁCTEOS CERUTTI',
                        direccion: 'Santa Fe 839 - La Playosa',
                        gmail: 'miguelcerutti_09@hotmail.com',
                        link: 'https://www.facebook.com/Lacteos-Cerutti-188231428648923/'
                    });
                    break;
                case 22:
                    this.marcas.push({
                        title: 'LÁCTEOS J Y M',
                        direccion: 'Zona Rural Cintra - Cintra',
                        gmail: 'maespizzo@hotmail.com',
                        link: ''
                    });
                    break;

                case 23:
                    this.marcas.push({
                        title: 'LÁCTEOS SAN LUCIO',
                        direccion: 'Av. Eva Perón 1256 - Morteros',
                        gmail: 'sanlucio@coopmorteros.com.ar',
                        link: ''
                    });
                    break;
                case 24:
                    this.marcas.push({
                        title: 'LACTEOS TIO PUJIO SRL',
                        direccion: 'Zona Rural Tío Pujio Rta Nacional N°9 km 579,8 - Tío Pujio',
                        gmail: 'compraslacteostiopujio@gmail.com',
                        link: 'https://www.facebook.com/LacteosTioPujio'
                    });
                    break;

                case 25:
                    this.marcas.push({
                        title: 'LAS TRES ESTRELLAS',
                        direccion: 'Estados Unidos 122 - Villa María',
                        gmail: 'administracion@lacteoslastres.com.ar',
                        link: 'https://www.facebook.com/pymelacteavm'
                    });
                    break;
                case 26:
                    this.marcas.push({
                        title: 'LATTAY',
                        direccion: 'Av. Independencia 322 - Laboulaye',
                        gmail: 'lcareri@hotmail.com',
                        link: 'https://facebook.com/lattay.quesos.1'
                    });
                    break;

                case 27:
                    this.marcas.push({
                        title: 'LEGENDARIO',
                        direccion: 'RN 158, Saturnino M.Laspiur (planta)',
                        gmail: 'legendarioquesos@gmail.com',
                        link: 'www.instagram.com/quesoslegendario'
                    });
                    break;
                case 28:
                    this.marcas.push({
                        title: 'LINEA DORADA',
                        direccion: 'Ruta N10 Km 72 - Villa del Rosario',
                        gmail: 'info@lineadorada.com.ar',
                        link: 'https://www.facebook.com/Linea-Dorada-101929124959059'
                    });
                    break;
                case 29:
                    this.marcas.push({
                        title: 'LOMBARDE-LACNAT-QUESOS ONLINE',
                        direccion: 'Lisandro de la Torre 234 - Villa María',
                        gmail: 'augartemendia@lacteoscds.com.ar',
                        link: 'https://www.facebook.com/QuesosOnline',
                    });
                    break;
                case 30:
                    this.marcas.push({
                        title: 'LOS PINOS',
                        direccion: 'García Montaño 234 - La Playosa',
                        gmail: 'administracion@lospinossrl.com.ar',
                        link: ''
                    });
                    break;
                case 31:
                    this.marcas.push({
                        title: 'MASTERLAC',
                        direccion: 'Mendoza 1881 - Monte Maíz',
                        gmail: 'rodolfomontechiari@gmail.com',
                        link: ''
                    });
                    break;
                case 32:
                    this.marcas.push({
                        title: 'QUESADA',
                        direccion: 'Av.Gral Paz 682 - Benjamín Gould',
                        gmail: 'ventasquesada@hotmail.com',
                        link: 'https://facebook.com/QuesadaLacteosSRL/'
                    });
                    break;
                case 33:
                    this.marcas.push({
                        title: 'QUESCOR',
                        direccion: 'Ignacio Elorza 877 - Etruria',
                        gmail: 'martin_ghigo@hotmail.com',
                        link: 'https://www.instagram.com/quescor_'
                    });
                    break;
                case 34:
                    this.marcas.push({
                        title: 'QUESO AZUL EMPERADOR',
                        direccion: 'Ruta Provincial 11 Km 136 - Ucacha',
                        gmail: 'cav_gruposavaz@hotmai.com',
                        link: 'https://www.facebook.com/quesoazulemperador'
                    });
                    break;
                case 35:
                    this.marcas.push({
                        title: 'RAGGIO DI SOLE',
                        direccion: 'Julio A. Roca 34 - Huanchilla',
                        gmail: 'hernanghersi@cthuanchilla.com.ar',
                        link: ''
                    });
                    break;
                case 36:
                    this.marcas.push({
                        title: 'SAN LORENZO',
                        direccion: 'Hipólito Irigoyen 865 - Bell Ville',
                        gmail: 'wjantonietta@yahoo.com.ar',
                        link: ''
                    });
                    break;
                case 37:
                    this.marcas.push({
                        title: 'SANTA CLARA',
                        direccion: 'Av.Carranza 499 - Villa Nueva',
                        gmail: 'fcasco@fasantaclara.com.ar',
                        link: ''
                    });
                    break;
                case 38:
                    this.marcas.push({
                        title: 'SANTA MARÍA',
                        direccion: 'Juan Venier 2099, Pque.Industrial - San Francisco',
                        gmail: 'sebastianpeiretti@hotmail.com',
                        link: ''
                    });
                    break;
                case 39:
                    this.marcas.push({
                        title: 'TONADITA',
                        direccion: 'Caudillos federales 1899 - Villa María',
                        gmail: 'gustavopiazza@elcor.com.ar',
                        link: ''
                    });
                    break;
                case 40:
                    this.marcas.push({
                        title: 'WINDY',
                        direccion: 'Av. del Trabajo 1143 - Córdoba',
                        gmail: 'info@windy.com.ar',
                        link: ''
                    });
                    break;

                default:
                    break;
            }
        }
    }
}