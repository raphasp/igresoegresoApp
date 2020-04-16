import { createReducer, on } from '@ngrx/store';
import *as ActionsIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgresoClass } from '../models/inglesoegreso.model';

export interface State {
    items: IngresoEgresoClass[]
}

export const initialState: State = {
   items: []
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(ActionsIngresoEgreso.setItem, (state, {items}) => ({ ...state, items: [...items]})),
    on(ActionsIngresoEgreso.unsetItem, (state) => ({ ...state, items: []})),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}