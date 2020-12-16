import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDTO } from '@models/user';
import { CommonService } from '@services/common.service';
import { ignoreElements } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() optinesNavbar: string;
  config: boolean;
  logoutB: boolean;
  inst: string = "https://www.instagram.com/minagricba/";
  aux: boolean;
  constructor(
    private commonService: CommonService,
    private router: Router
  ) {
    this.aux = false;
  }

  ngOnInit(): void {

    if (this.optinesNavbar == 'configuracionEvento' || this.optinesNavbar == 'autentificacion') {
      this.config = true;
    } else {
      this.config = false;
    }
  }

  // ----------------------------------------------------------------
  // Validamos si el usuraio tiene la autoridad para redirigir
  // ----------------------------------------------------------------
  reDirectoa(endPoint: string): void {
    let user = new JwtDTO;
    user = this.commonService.getUser();
    const token = localStorage.getItem("token_user");
    //validamos si existe algun usuario guardado , de lo contrario lo redirigimos al login
    if (token) {
      if (endPoint == 'stream') {
        this.router.navigate(['/configuracionEvento/' + endPoint])
      } else if (user) {
        this.logoutB = true;
        let aux = false;
        user.authorities.forEach(anAuth => {
          if (endPoint == "adminUsuarios") {
            if (anAuth.authority.indexOf("SUPER") != -1) {
              this.router.navigate(['/configuracionEvento/' + endPoint]);
              aux = true;
            }
          } else {
            if (anAuth.authority.indexOf("ADMIN") != -1) {
              this.router.navigate(['/configuracionEvento/' + endPoint]);
              aux = true;
            }
          }
        });
        if (!aux)
          this.router.navigate(['/configuracionEvento/error']);
      } else {
        this.router.navigate(['/autentificacion/']);
      }
    } else {
      this.logoutB = false;
      this.router.navigate(['/autentificacion/']);
    }
  };

  validRedirigir(user: JwtDTO, endpoint: string): void {

  }

  //-----------------------------------------------------------------------------
  // Metodo para cerrar sesion , borrando localStorage y redireccionando al login
  //-----------------------------------------------------------------------------
  logout() {
    localStorage.clear();
    this.commonService.setUser('');
    this.logoutB = false;
    this.router.navigate(['/autentificacion/']);
  }


  smmoothScroll(seccion: string): void {

    let a = this.commonService.getUrl();

    if (localStorage.getItem("codigos").length > 0 || a.length > 0) {
      if (this.router.url.includes("quesos") || this.router.url.includes("festival")) {
        if (seccion == "inicio") {
          this.router.navigate(['/']);
        } else {
          document.getElementById(`${seccion}`).scrollIntoView();
        }
      } else {
        let url = this.commonService.getUrl();
        if (url == "") {
          url = localStorage.getItem("url");
        }
        this.router.navigate(['/stream/', url]);
      }
    }
  }
}
