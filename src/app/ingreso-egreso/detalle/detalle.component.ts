import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoClass } from '../../models/inglesoegreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEItems: IngresoEgresoClass[] = [];
  ingresEgrSubcription: Subscription;

  constructor(
    private _storeRedux: Store<AppStateWithIngreso>,
    private _ingresoEgreService: IngresoEgresoService
  ) { }

  ngOnInit() {
      this.ingresEgrSubcription = this._storeRedux.select('ingresosEgresos')
      .subscribe((ingresosEgresosResp) =>{
        this.ingresoEItems = ingresosEgresosResp.items;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ingresEgrSubcription.unsubscribe();
  }

  deleteItem = (uid: string):void => {
    this._ingresoEgreService.deleteItemIngresoEgreso(uid)
    .then(()=>{
      Swal.fire('Borrado', 'Item borrado exitosamente!', 'success');
    }).catch( error => {
      Swal.fire('Error', error.message, 'error');
    });    
  }
}
