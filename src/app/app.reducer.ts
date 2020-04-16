import { ActionReducerMap } from '@ngrx/store';
import * as UI from './shared/ui.reducer';
import * as Auth from './auth/auth.reducer'
import * as  IngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
   ui: UI.State,
   user: Auth.State,
   ingresosEgresos: IngresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: UI.uiReducer,
    user: Auth.authReducer,
    ingresosEgresos: IngresoEgreso.ingresoEgresoReducer
}
