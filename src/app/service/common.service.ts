import { Injectable } from '@angular/core';
import { JwtDTO } from '@models/user';

@Injectable({ providedIn: 'root' })
export class CommonService {

    user: JwtDTO;
    config: boolean;
    menu: string[];

    constructor() {
        this.menu = [];
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

}