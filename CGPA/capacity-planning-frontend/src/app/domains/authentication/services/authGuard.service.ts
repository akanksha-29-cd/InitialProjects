import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    return this.authService.isLoggedIn().then((val) => {
      if (!val) {
        this.authService.startLogin();
      }
      return val;
    });
  }
}
