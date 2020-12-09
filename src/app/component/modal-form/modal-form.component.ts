import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements AfterViewInit {

  @ViewChild("container") templateModal: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    ($('#modalFormInit') as any).modal('show');
  
  }

  ngOnInit(): void {
  }

}
