import { inject } from '@angular/core';
import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
   const router = inject(Router);
  const protectedRoutes = ['/dashboard', '/profile', '/setting'];
  const userValid = localStorage.getItem('parkUser');

  if (protectedRoutes.includes(state.url) && !userValid) {
    return router.createUrlTree(['/']); 
  }

  return true; 
};
