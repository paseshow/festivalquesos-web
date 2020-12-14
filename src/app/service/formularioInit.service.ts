import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Formulario } from '@models/formulario';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class FormularioInitService {

    endpoint = "apiform/"

    constructor(
        private http: HttpClient
    ) { }


    addForm(formulario): Observable<Formulario> {
        return this.http.put<Formulario>(environment.apiUrl + this.endpoint + 'add', JSON.stringify(formulario)).pipe(take(1));
    };

    reportFormByIdEvento(idEvento) {
        return this.http.get(environment.apiUrl + this.endpoint + "report/" + idEvento).pipe(take(1));
    }

}