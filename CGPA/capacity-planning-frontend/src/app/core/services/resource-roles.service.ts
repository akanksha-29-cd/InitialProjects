//#region imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class ResourceRoleService extends HttpProvider {
  private readonly endpoint = 'role/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getResourceRoles(): Observable<any> {
    return this.get(this.endpoint);
  }
  //#endregion query
}
