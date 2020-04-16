import { createAction, props } from '@ngrx/store';
import { IngresoEgresoClass } from '../models/inglesoegreso.model';

export const unsetItem = createAction('[Ingreso Egreso] Unset Item');

export const setItem = createAction(
    '[Ingreso Egreso] Set Item',
    props<{items: IngresoEgresoClass[] }>()
);