import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as UI from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm : FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription

  constructor(
    private _formBuilder: FormBuilder,
    private _authServe: AuthService,
    private _storeRedux: Store<AppState>,
    private _roters:Router
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this._storeRedux.select('ui')
                        .subscribe(ui => {
                            this.cargando = ui.stateLoading;
                            console.log('Cargando subs')
                        });
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  loginUser = ():void => {
    console.log(this.loginForm)
    if(this.loginForm.invalid){ return; }

    this._storeRedux.dispatch(UI.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    const {email, password} = this.loginForm.value;

    this._authServe.loginUser(email, password)
      .then(request => {
        //console.log(request);
        // Swal.close();

        this._storeRedux.dispatch(UI.stopLoading());

        this._roters.navigate(['/']);
    }).catch(error => {
      this._storeRedux.dispatch(UI.stopLoading());
      //console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });

  }

}
