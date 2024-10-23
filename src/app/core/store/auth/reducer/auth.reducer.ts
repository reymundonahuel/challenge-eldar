import { createReducer, on } from '@ngrx/store';
import {
  setRoles,
  clearRoles,
  setPermissions,
  clearPermissions,
} from '../actions/auth.actions';
import { initialAuthState, AuthState } from '../states/auth.state';


export const authReducer = createReducer(
    initialAuthState,
  
    on(setRoles, (state, { roles }): AuthState => {
        console.log(roles)
      localStorage.setItem('roles', JSON.stringify(roles));
      return { ...state, roles };
    }),
  
    on(clearRoles, (state): AuthState => {
      localStorage.removeItem('roles');
      return { ...state, roles: [] };
    }),
  
    on(setPermissions, (state, { permissions }): AuthState => {
      localStorage.setItem('permissions', JSON.stringify(permissions));
      return { ...state, permissions };
    }),
  
    on(clearPermissions, (state): AuthState => {
      localStorage.removeItem('permissions');
      return { ...state, permissions: [] };
    })
  );
