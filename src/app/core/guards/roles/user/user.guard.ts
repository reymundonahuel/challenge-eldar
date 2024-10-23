import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Routes_app } from '../../../constants/routes.constants';
import { RolesEnum } from '../../../enums/roles.enum';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs';
import { selectRoles } from '../../../store/auth/selectors/auth.selectors';

export const userGuard: CanActivateFn = (route, state) => {
  const store = inject(Store); 
  const router = inject(Router);

  return store.select(selectRoles).pipe(
    take(1),
    map((roles: string[]) => {
      if (roles.includes(RolesEnum.USER)) {
        return true;
      } else {
        router.navigate([Routes_app.dashboard]);
        return false;
      }
    })
  );
};
