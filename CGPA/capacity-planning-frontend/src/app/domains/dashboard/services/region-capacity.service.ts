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
export class RegionCapacityService extends HttpProvider {
  private readonly endpoint = 'region_capacity';
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getRegionCapacity(year: { year: number }): Observable<any> {
    return this.get(this.endpoint, year);
  }
  //#endregion query

  //#region operations
  //#endregion operations
}
