import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from 'src/app/core/common/http-provider.service';

import * as ProjectParameter from '../parameters/_module';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends HttpProvider {
  private readonly endpoint = 'project/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getprojects(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveProject(
    parameter: ProjectParameter.AddProjectParameter
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateProject(
    parameter: ProjectParameter.UpdateProjectParameter
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }

  deleteProject(data: { id: string }): Observable<any> {
    return this.delete(this.endpoint, data);
  }
  //#endregion operations
}
