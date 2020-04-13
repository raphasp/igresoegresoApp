import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebarr.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logOut= ():void => {
    console.log('logout');
    Swal.fire({
      title: 'Cerrando Sesión',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._authService.logOut().then(response => {
      Swal.close();
        this._router.navigate(['/login']);
    }).catch(error => {
      //console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    })
  }
}
