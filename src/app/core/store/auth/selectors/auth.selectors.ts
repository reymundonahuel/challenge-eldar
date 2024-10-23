import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectRoles = createSelector(
  selectAuthState,
  (state: AuthState) => state.roles
);

export const selectPermissions = createSelector(
  selectAuthState,
  (state: AuthState) => state.permissions
);

export const selectHasRole = (role: string) =>
  createSelector(selectRoles, (roles: string[]) => roles.includes(role));

export const selectHasPermission = (permission: string) =>
  createSelector(selectPermissions, (permissions: string[]) =>
    permissions.includes(permission)
  );
