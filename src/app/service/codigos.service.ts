import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CodigosLoad } from '@models/codigos';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CodigosService {

    endpoint = "codigos/";

    constructor(
        private http: HttpClient
    ) { }


    validCodigo(jsonCode) {
        return this.http.post(environment.apiUrl + this.endpoint + "code", jsonCode).pipe(take(1));
    };

    reportCodigosByIdevento(idEvento) {
        return this.http.get(environment.apiUrl + this.endpoint + "report/" + idEvento).pipe(take(1));
    };

    loadCodigos(codigos: CodigosLoad[]) {
        return this.http.post(environment.apiUrl + this.endpoint + "loadCodigos", JSON.stringify(codigos)).pipe(take(1));
    }
}