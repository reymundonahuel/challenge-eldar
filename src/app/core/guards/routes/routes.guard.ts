import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session/session-service.service';
import { of } from 'rxjs';
import { Routes_Auth } from '../../constants/routes.constants';

export const routesGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);           
  const token = sessionService.getToken()

  if (token == null) {
    // Redirigir al login si no hay token
    router.navigate([Routes_Auth.login]); 

    // Bloquear acceso
    return of(false);            
  }else{
    return true;
  }
};