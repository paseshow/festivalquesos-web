import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser, User } from '@models/user';
import { UsersService } from '@services/users.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit {

  @ViewChild('modal', { static: false }) modal: ElementRef;
  formNewUser: FormGroup;
  users: User[];
  isLoading: boolean;
  msjError: string;
  viewPassow: boolean;
  typePassword: string;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    public toastr: ToastrService,
  ) {
    this.isLoading = true;
    this.msjError = '';
    this.viewPassow = false;
    this.typePassword = "password";
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadUsers();
  }

  // --------------------------------------------
  // Inicializamos el formulario de nuevo usuario
  // --------------------------------------------
  buildForm() {
    this.formNewUser = this.fb.group({
      name: ['', [Validators.required]],
      nameUser: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
      roleAdmin: [false],
      roleSuperAdmin: [false]
    })
  }

  get pass2NoValid() {
    const pass1 = this.formNewUser.get('password').value;
    const pass2 = this.formNewUser.get('passwordRepeat').value;
    return (pass1 === pass2) ? true : false
  }

  //------------------------------------------
  // Validamos que ambas contraseñas coincidan
  //------------------------------------------
  passwordIguales(password: string, passwordRepeat: string) {
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.controls[password];
      const pass2control = formGroup.controls[passwordRepeat];
      if (pass1control.value === pass1control.value) {
        pass2control.setErrors(null);
      } else {
        pass2control.setErrors({ noEsigual: true });
      }
    }
  };

  // --------------------------------------------
  // Metodo para visualizar los usuarios creados
  // --------------------------------------------
  loadUsers() {
    this.usersService.loadUsers().subscribe(
      (next: User[]) => {
        this.users = next;
        this.isLoading = false;
      }, error => {
        console.error('error en adminstrar usuario component:', error);
        this.toastr.error("Ups, parece que hubo un problema, aguarde un momento");


      }
    )
  }

  // ---------------------------------------
  // Metodo para crear nuevo usuarios.
  // Solo para roles admin
  // ---------------------------------------
  saveUsuario(): void {
    this.msjError = '';
    let newUser = new NewUser();
    newUser.name = this.formNewUser.get("name").value;
    newUser.nameUser = this.formNewUser.get("nameUser").value;
    newUser.email = this.formNewUser.get("email").value;
    newUser.password = this.formNewUser.get("password").value;
    if (this.formNewUser.get("roleSuperAdmin").value) {
      newUser.roles = ["super"]
    } else if (this.formNewUser.get("roleAdmin").value) {
      newUser.roles = ["admin"];
    }

    this.usersService.createdNewuser(newUser).subscribe(
      next => {
      }, error => {
        if (error.status == 201) {
          this.modal.nativeElement.click();
          this.loadUsers();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.formNewUser.reset();
          let errorObj = JSON.parse(JSON.stringify(error));
          this.msjError = errorObj.error.error.descripcion;
        }
      }
    )
  };

  // ----------------------------------------------------------------------------------------------
  // Eliminamos usuario , partiendo del indice obtenemos el id del usuario correspondiente de Users
  // ----------------------------------------------------------------------------------------------
  deletUser(i: number): void {
    let idUser = this.users[i].id;

    Swal.fire({
      title: '¿Seguro que quiere eliminar esté usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usersService.deleteUser(idUser).subscribe(
          next => {
          }, (error: Response) => {
            if (error.status == 200) {
              this.loadUsers();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario eliminado!',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      }
    })
  };

  viewPass() {
    this.viewPassow = !this.viewPassow;
    this.typePassword = this.viewPassow ? "text" : "password";
  }

}
