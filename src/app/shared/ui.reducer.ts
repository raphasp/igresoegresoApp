import { createReducer, on } from '@ngrx/store';
import * as actionsUI from './ui.actions';

export interface State {
    stateLoading: boolean; 
}

export const initialState: State = {
   stateLoading: false,
}

const _uiReducer = createReducer(initialState,

    on(actionsUI.isLoading, state => ({ ...state, stateLoading: true})),
    on(actionsUI.stopLoading, state => ({ ...state,stateLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}