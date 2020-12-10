import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Evento } from '@models/evento';
import { Observable, Observer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventoesService {

    endPoint = "eventoes/";

    constructor(
        private http: HttpClient
    ) { }


    listAll(): Observable<Evento[]> {
        return this.http.get<Evento[]>(environment.apiUrl + this.endPoint + "list").pipe(take(1));
    }

    saveNewEvent(formEvent) {
        return this.http.post(environment.apiUrl + this.endPoint + 'add', formEvent).pipe(take(1));
    }

    deleteEvent(IdEvent) {
        return this.http.delete(environment.apiUrl + this.endPoint + IdEvent).pipe(take(1));
    }
}