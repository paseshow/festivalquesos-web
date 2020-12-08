import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/user';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit {

  formNewUser: FormGroup;
  users: User[];
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.isLoading = true;
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
      roles: ['']
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

  }

}
