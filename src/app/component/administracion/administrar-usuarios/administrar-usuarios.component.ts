import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser, User } from '@models/user';
import { UsersService } from '@services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit {

  formNewUser: FormGroup;
  users: User[];
  isLoading: boolean;
  msjError: string;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.isLoading = true;
    this.msjError = '';
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
      roleAdmin: [false]
    })
  }

  // --------------------------------------------
  // Metodo para visualizar los usuarios creados
  // --------------------------------------------
  loadUsers() {
    this.usersService.loadUsers().subscribe(
      (next: User[]) => {
        this.users = next;
        this.isLoading = false;
      }, error => {

      }
    )
  }

  // ---------------------------------------
  // Metodo para crear nuevo usuarios.
  // Solo para roles super admin
  // ---------------------------------------
  saveUsuario() {

    this.msjError = '';

    let newUser = new NewUser();

    newUser.name = this.formNewUser.get("name").value;
    newUser.nameUser = this.formNewUser.get("nameUser").value;
    newUser.email = this.formNewUser.get("email").value;
    newUser.password = this.formNewUser.get("password").value;
    newUser.roles = this.formNewUser.get("roleAdmin").value ? ["admin"] : [""];

    this.usersService.createdNewuser(newUser).subscribe(
      next => {
        this.loadUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
      }, error => {

        this.formNewUser.reset();

        let errorObj = JSON.parse(JSON.stringify(error));

        this.msjError = errorObj.error.error.descripcion;

      }
    )
  }

}
