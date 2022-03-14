//#region  imports
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
//#endregion imports
//#region internal imports
import {
  UserManager,
  UserManagerSettings,
  User,
  WebStorageStateStore,
  SignoutResponse,
} from 'oidc-client';

import { AppDataService } from '../services/appData.service';
//#endregion internal imports

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  private user: User = null;

  constructor(private appDataService: AppDataService) {
    const stsSettings: UserManagerSettings = {
      authority: environment.authority,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      redirect_uri: `${environment.redirectUri}auth-callback`,
      post_logout_redirect_uri: `${environment.postLogoutRedirectUri}signout-callback`,
      response_type: 'code',
      scope: 'openid profileLight',
      filterProtocolClaims: true,
      loadUserInfo: true,

      metadata: {
        claims_parameter_supported: true,
        introspection_endpoint: environment.introspectionEndpoint,
        check_session_iframe: environment.checkSessionIframe,
        issuer: environment.issuer,
        authorization_endpoint: environment.authorizationEndpoint,
        claims_supported: [
          'stGoSGI',
          'name',
          'last_name',
          'given_name',
          'first_name',
          'family_name',
          'email',
        ],
        token_endpoint: environment.tokenEndpoint,
        end_session_endpoint: environment.endSessionEndpoint,
        userinfo_endpoint: environment.userInfoEndpoint,
        jwks_uri: environment.jwksUri,
        registration_endpoint: environment.registrationEndpoint,
      },

      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    };

    this.userManager = new UserManager(stsSettings);
  }

  public get sgId(): string {
    if (this.user && !this.user.expired) {
      return this.user.profile.sub;
    }
  }

  public get firstName(): string {
    if (this.user && !this.user.expired) {
      return this.user.profile.name;
    }
  }

  public get lastName(): string {
    if (this.user && !this.user.expired) {
      return this.user.profile.family_name;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then((user) => {
      const userCurrent = !!user && !user.expired;
      this.user = user;
      return userCurrent;
    });
  }

  startLogin(): Promise<void> {
    return this.userManager.signinRedirect({
      extraQueryParams: {
        realm: 'AccessManagement',
      },
    });
  }

  async completeLogin(): Promise<User> {
    return this.userManager.signinRedirectCallback().then((user) => {
      this.user = user;
      return user;
    });
  }

  startLogout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  completeLogout(): Promise<SignoutResponse> {
    this.user = null;
    return this.userManager.signoutRedirectCallback();
  }

  getAuthHeaderValue(): string {
    if (!this.user && this.user?.expired) {
      this.startLogin();
    }
    return `${this.user?.token_type} ${this.user?.access_token}`;
  }

  getProxyLogin(): string {
    if (this.appDataService.proxyLogin != null) {
      return this.appDataService?.proxyLogin;
    } else {
      return '';
    }
  }
}
