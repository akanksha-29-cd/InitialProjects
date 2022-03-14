//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class TeamService extends HttpProvider {
  private readonly endpoint = 'teams';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getTeams(): Observable<any> {
    return this.get(this.endpoint,{active:true});
  }
  //#endregion query

  //#region operations

  //#endregion operations
}
