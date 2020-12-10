import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements AfterViewInit, OnInit {

  @ViewChild("container") templateModal: ElementRef;

  formGroup: FormGroup;

  constructor() { }

  ngAfterViewInit(): void {
    ($('#modalFormInit') as any).modal('show');
  
  }

  ngOnInit(): void {
    
  }

}
