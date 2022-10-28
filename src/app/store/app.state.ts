import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducer';

export interface AppState {
    auth: auth.AuthState
}

export const reducers = {
    auth: auth.authReducer
}

export const selectAuthState = createFeatureSelector<AppState>('auth');