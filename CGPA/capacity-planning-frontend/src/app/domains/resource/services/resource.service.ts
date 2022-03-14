//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import * as ResourceParameter from '../parameters/_module';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends HttpProvider {
  private readonly endpoint = 'resource/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getResources(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveResource(
    parameter: ResourceParameter.AddResourceParameter
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateResource(
    parameter: ResourceParameter.UpdateResourceParameter
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }
  //#endregion operations
}
