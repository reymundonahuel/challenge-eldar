import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../../shared/services/session/session-service.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let sessionService = inject(SessionService)
  const token = sessionService.getToken()

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
