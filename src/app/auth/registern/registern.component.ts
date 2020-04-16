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
  selector: 'app-register',
  templateUrl: './registern.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerfGroup: FormGroup;
  uiSubscription: Subscription;
  cargando: boolean = false;

  constructor(
    private _fBuild: FormBuilder,
    private _authServide: AuthService,
    private _storeReduz: Store<AppState>,
    private _router: Router
  ) { }

  ngOnInit() {
    this.registerfGroup = this._fBuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this._storeReduz.select('ui')
                                .subscribe( ui => {
                                  this.cargando = ui.stateLoading;
                                  console.log('cargando subs Register');
                                });
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  createUser = ():void => {
    if(this.registerfGroup.invalid){ return; }

    this._storeReduz.dispatch(UI.isLoading())
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const {name, email, password} = this.registerfGroup.value;
    this._authServide.createUser(name, email, password)
    .then(credenciales => {
      // Swal.close();

      this._storeReduz.dispatch(UI.stopLoading())

      this._router.navigate(['/']);
    })
    .catch( error => {
      this._storeReduz.dispatch(UI.stopLoading())      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
