import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './registern.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerfGroup: FormGroup;
  constructor(
    private _fBuild: FormBuilder,
    private _authServide: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.registerfGroup = this._fBuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createUser = ():void => {
    if(this.registerfGroup.invalid){ return; }

    Swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const {name, email, password} = this.registerfGroup.value;
    this._authServide.createUser(name, email, password)
    .then(credenciales => {
      Swal.close();
      this._router.navigate(['/']);
    })
    .catch( error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
