import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceShared } from '../../../../shared/services/auth/auth-service.service';
import { Routes_app } from '../../../constants/routes.constants';
import { RolesEnum } from '../../../enums/roles.enum';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = Inject(AuthServiceShared)
  const router = Inject(Router)
 
  if (authService.hasRole(RolesEnum.ADMIN)) {
   return true;
 } else {
   router.navigate([Routes_app.dashboard]);
   return false;
 }
};
