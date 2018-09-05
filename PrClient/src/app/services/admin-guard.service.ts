import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as auth0 from '../../../node_modules/auth0-js/build/auth0.js';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isAdmin) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
