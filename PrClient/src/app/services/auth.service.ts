// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from '../../../node_modules/auth0-js/build/auth0.js';
import { environment } from '../environment';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'l4seq5tH68M7d4IEHXVKIBVoJO1NC3dW',
    domain: 'cmcgrathweb.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'PrPropertiesAPI',
    redirectUri: environment.redirectUri,
    scope: 'openid profile email role:admin'
  });

  isAdmin = false;

  userProfile: any;

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public setProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.setRoles(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log(authResult);
    
  //  const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
  //  return roles.indexOf('admin') > -1;    

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log(authResult);
  }

  private setRoles(authResult){
    if (authResult.idTokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles'].indexOf('admin') > -1){
      this.isAdmin = true;
    }
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


}
