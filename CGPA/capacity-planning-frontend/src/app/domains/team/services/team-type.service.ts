//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import * as TeamParameter from '../parameters/_module';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class TeamTypeService extends HttpProvider {
  private readonly endpoint = 'teamtype';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getTeamType(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveTeamType(
    parameter: TeamParameter.AddTeamTypeParameter
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateTeamType(
    parameter: TeamParameter.UpdateTeamTypeParameter
  ): Observable<any> {
    return this.delete(this.endpoint, parameter);
  }
  //#endregion operations
}
