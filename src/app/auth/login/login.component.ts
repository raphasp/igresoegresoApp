import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _authServe: AuthService,
    private _roters:Router
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser = ():void => {
    console.log(this.loginForm)
    if(this.loginForm.invalid){ return; }

    Swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    const {email, password} = this.loginForm.value;

    this._authServe.loginUser(email, password)
      .then(request => {
        console.log(request);
        Swal.close();
        this._roters.navigate(['/']);
    }).catch(error => {
      console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
    });

  }

}
