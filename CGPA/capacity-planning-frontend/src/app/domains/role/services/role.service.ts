//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import * as RoleParameter from '../parameters/_module';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class RoleService extends HttpProvider {
  private readonly endpoint = 'role/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getRoles(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveRole(
    parameter: RoleParameter.AddRoleParameter
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateRole(
    parameter: RoleParameter.UpdateRoleParameter
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }
  //#endregion operations
}