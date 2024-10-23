import { createAction, props } from '@ngrx/store';

export const setRoles = createAction(
  '[Auth] Set Roles',
  props<{ roles: string[] }>()
);

export const clearRoles = createAction('[Auth] Clear Roles');

export const setPermissions = createAction(
  '[Auth] Set Permissions',
  props<{ permissions: string[] }>()
);

export const clearPermissions = createAction('[Auth] Clear Permissions');
