import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const authToken = Cookies.get('auth_token');

    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
