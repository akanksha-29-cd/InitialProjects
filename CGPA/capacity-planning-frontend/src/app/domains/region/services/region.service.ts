//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import * as RegionParameter from '../parameters/_module';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class RegionService extends HttpProvider {
  private readonly endpoint = 'region/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getRegions(): Observable<any> {
    return this.get(this.endpoint);
  }

  //#endregion query

  //#region operations
  saveRegion(
    parameter: RegionParameter.AddRegionParameter
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateRegion(
    parameter: RegionParameter.UpdateRegionParameter
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }
  //#endregion operations
}
