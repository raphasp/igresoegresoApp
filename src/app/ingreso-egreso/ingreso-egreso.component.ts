import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresoClass } from '../models/inglesoegreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup; 
  tipo: boolean = true // true= ingreso false= egreso
  loading: boolean = false;
  loadingSucription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _ingresoEgresoServer: IngresoEgresoService,
    private _stroreRedux: Store<AppState>
  ) { }

  ngOnInit() {
    this.ingresoForm = this._formBuilder.group({
      description: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.loadingSucription = this._stroreRedux.select('ui').subscribe(uireqLoading => {
          this.loading = uireqLoading.stateLoading;
        });
  }

  ngOnDestroy(){
    this.loadingSucription.unsubscribe();
  }

  saveIgreso = ():void => {
    if(this.ingresoForm.invalid){ return; }
    let type: string = (this.tipo)? 'ingreso' : 'egreso';
    // console.log(this.ingresoForm.value);
    // console.log(type);

    this._stroreRedux.dispatch(isLoading());

    const {description, monto} = this.ingresoForm.value;
    const ingresoEgresoIns = new IngresoEgresoClass(description, monto, type);

      this._ingresoEgresoServer.crearIngresoEgreso( ingresoEgresoIns ).
          then( (ref) => {
            console.log('Exito:')          
            console.log(ref);
            this.ingresoForm.reset();
            this._stroreRedux.dispatch(stopLoading());
            Swal.fire('Registro creado', description, 'success');
          }).catch((error) => {
            console.warn(error);
            this._stroreRedux.dispatch(stopLoading());
            Swal.fire('Error de registro', error.message, 'error');
          });
  }

}
