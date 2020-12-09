import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements AfterViewInit {

  @ViewChild("container") templateModal: ElementRef;

  formInit: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    ($('#modalFormInit') as any).modal('show');
  }

  ngOnInit(): void {
  }

}
