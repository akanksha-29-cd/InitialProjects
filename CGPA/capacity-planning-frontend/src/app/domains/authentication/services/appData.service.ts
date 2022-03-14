//#region imports
import { Injectable } from '@angular/core';
//#endregion imports

//#region internal imports
import { UserProfile } from '../../../core/model/authentication/userProfile.model';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private _connectedUser: UserProfile;
  private _careerPathInitiated: boolean;
  private _proxyLogin: string;

  constructor() {}

  public get connectedUser(): UserProfile {
    if (this._connectedUser) {
      return this._connectedUser;
    } else {
      this._connectedUser = JSON.parse(sessionStorage.getItem('connectedUser'));
      return this._connectedUser;
    }
  }
  public set connectedUser(value: UserProfile) {
    this._connectedUser = value;
    sessionStorage.setItem(
      'connectedUser',
      JSON.stringify(this._connectedUser)
    );
  }

  public get careerPathInitiated(): boolean {
    if (this._careerPathInitiated) {
      return this._careerPathInitiated;
    } else {
      this._careerPathInitiated = JSON.parse(
        sessionStorage.getItem('careerPathInitiated')
      );
      return this._careerPathInitiated;
    }
  }
  public set careerPathInitiated(value: boolean) {
    this._careerPathInitiated = value;
    sessionStorage.setItem(
      'careerPathInitiated',
      JSON.stringify(this._careerPathInitiated)
    );
  }

  public get proxyLogin(): string {
    if (this._proxyLogin) {
      return this._proxyLogin;
    } else {
      this._proxyLogin = JSON.parse(sessionStorage.getItem('proxyLogin'));
      return this._proxyLogin;
    }
  }

  public set proxyLogin(value: string) {
    this._proxyLogin = value;
    sessionStorage.setItem('proxyLogin', JSON.stringify(this._proxyLogin));
  }
}
