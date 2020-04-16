import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ActionsIngresosEgresos from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubsciption: Subscription;
  ingresosSubsciption: Subscription;
  constructor(
    private _storeRedux: Store<AppState>,
    private _ingresoEService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.userSubsciption = this._storeRedux.select('user')
      .pipe(
        filter( auth => auth.user !== null)
      )
      .subscribe(({user}) =>{
        console.log(user);
        this.ingresosSubsciption = this._ingresoEService.initIngresoEgresoListener(user.uid)
          .subscribe(listingresosEgresosFB => {
            console.log(listingresosEgresosFB);
            this._storeRedux.
              dispatch(ActionsIngresosEgresos.setItem({items: listingresosEgresosFB}));
          });
      });
  }

  ngOnDestroy(): void {
    this.ingresosSubsciption.unsubscribe();
    this.userSubsciption.unsubscribe();
  }

}
