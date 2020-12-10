import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CodigosService {

    endpoint = "codigos/";

    constructor(
        private http: HttpClient
    ) { }


    validCodigo(jsonCode) {
        return this.http.post(environment.apiUrl + this.endpoint + "code", jsonCode).pipe(take(1));
    }
}