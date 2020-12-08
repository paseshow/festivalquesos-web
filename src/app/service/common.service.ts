import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {

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

    setMenu(menu: string[]): void {
        this.menu = menu;
    }

    getMenu(): string[] {
        return this.menu;
    }

}