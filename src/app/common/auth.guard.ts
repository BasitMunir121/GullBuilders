import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,Router, RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/authservice';

  export const AuthGuard:   CanActivateFn = (route:ActivatedRouteSnapshot , state :RouterStateSnapshot) =>{
    const authService: AuthService = inject(AuthService);
    const currentUser =authService.currentUserValue;
    if (!currentUser.isExpired) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    authService.logout();
    return false;
}

export const UserGuard:CanActivateFn = (route:ActivatedRouteSnapshot , state :RouterStateSnapshot) =>{
  const authService: AuthService = inject(AuthService);
  const currentUser =authService.currentUserValue;
  if (currentUser== null || currentUser.isExpired) {
    // logged in so return true
    return true;
  }
  //authService.RedirectToDashboard();
  const urlParams = new URLSearchParams(state.url.split('?')[1]);
  const originalUrl = urlParams.get('url');
  if (originalUrl) {
    authService.RedirectToDashboard(originalUrl);
  } else {
    authService.RedirectToDashboard();
  }
  return false;
}
