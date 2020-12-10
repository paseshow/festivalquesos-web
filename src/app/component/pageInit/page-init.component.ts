import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
    selector: 'page-init-app',
    templateUrl: 'page-init.component.html',
    styleUrls:['page-init.component.scss']
    
})


export class PageInitComponent implements OnInit {

    
    showModalFormCondition: boolean = true;
    
    constructor() { }
  

    ngOnInit() { }
        
}