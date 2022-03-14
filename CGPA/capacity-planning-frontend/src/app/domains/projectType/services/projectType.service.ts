import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import { ProjectType } from '../../../core/model/project/entities/project-type.entity';




@Injectable({
  providedIn: 'root',
})
export class ProjectTypeService extends HttpProvider {
  private readonly endpoint = 'projectType/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getProjectTypes(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveProjectType(
    parameter: ProjectType
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateProjectType(
    parameter: ProjectType
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }


  //#endregion operations
}
