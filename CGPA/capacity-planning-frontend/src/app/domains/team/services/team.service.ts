import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import { Team } from 'src/app/core/model/team/entities/team.entity';



@Injectable({
  providedIn: 'root',
})
export class TeamService extends HttpProvider {
  private readonly endpoint = 'teams/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getTeams(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveTeam(
    parameter: any
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateTeam(
    parameter: Team
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }

  deleteTeam(data: { id: string }): Observable<any> {
    return this.delete(this.endpoint, data);
  }
  //#endregion operations
}
