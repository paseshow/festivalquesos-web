import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { JwtDTO, UserLogin } from '@models/user';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {


    endpoints = "auth/";

    constructor(
        private http: HttpClient
    ) { }

    createdNewuser() {
        //return this.http.put()
    }

    loadUsers() {
        return this.http.get(environment.apiUrl + this.endpoints + "users").pipe(take(1));
    }

    login(userLogin: UserLogin): Observable<JwtDTO> {
        this.borrarCredenciales();
        return this.http.post<JwtDTO>(environment.apiUrl + this.endpoints + "login", JSON.stringify(userLogin)).pipe(take(1));
    }

    // -----------------------------------------
    // Limpiamos el localStorage antes de loguear
    // ------------------------------------------
    borrarCredenciales() {
        if (localStorage.length > 0)
            localStorage.clear();
    }
}