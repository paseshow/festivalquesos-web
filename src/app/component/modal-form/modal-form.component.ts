import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements AfterViewInit, OnInit {

  @ViewChild("container") templateModal: ElementRef;

  //myInput: FormControl = new FormControl('');
  modalForm: FormGroup
  submitted = false;
  buttonCloseModal: any ;

  constructor(private formBuilder: FormBuilder) { }

  ngAfterViewInit(): void {
    ($('#modalFormInit') as any).modal('show');
  
  }

  get fm() { return this.modalForm.controls; }

  ngOnInit(): void {

    this.modalForm = this.formBuilder.group({
      completeName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      question: ['',[Validators.required, Validators.minLength(4)] ]
  });
    
  }

  onSubmit(){
   this.submitted = true;

    if(this.modalForm.valid){

      this.buttonCloseModal.
      
      return;
     
    } 
  };

}
