import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { JwtDTO, UserLogin } from '@models/user';
import { CommonService } from '@services/common.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('password', { static: false }) password: ElementRef;
  viewPassow: boolean;
  typePassword: string;
  formLogin: FormGroup;
  errorLogin: boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.viewPassow = false;
    this.typePassword = "password";
    this.errorLogin = false;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  // -----------------------------------------------------------
  // Inicializamos el formulario que se completara con el login
  // -----------------------------------------------------------
  buildForm(): void {
    this.formLogin = this.fb.group({
      nameUser: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // --------------------------------------------------------------
  // Metodo para ir alterando los logos de visualidar la contraseña
  // ---------------------------------------------------------------
  viewPass(): void {
    this.viewPassow = !this.viewPassow;

    this.typePassword = this.viewPassow ? "text" : "password";
  }

  // -------------------------------
  // Login de persona administrativa
  // -------------------------------
  login() {
    let userLogin = new UserLogin();
    userLogin.nameUser = this.formLogin.get("nameUser").value;
    userLogin.password = this.formLogin.get("password").value;
    this.userService.login(userLogin).subscribe(
      (next: JwtDTO) => {
        this.errorLogin = false;
        //guardamos token
        localStorage.setItem("token_user", next.token);
        this.commonService.setUser(next);
        this.router.navigate(['/configuracionEvento']);
      }, error => {
        this.errorLogin = true;
      }

    )
  }
}
