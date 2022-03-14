//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import { DayAllocationFilter } from '../parameters/_module';
import { OverAllResourceCapacity } from '../parameters/filters/overall-resource-capacity.filter';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends HttpProvider {
  private readonly endpoint = 'allocatedCapacity';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getCapacity(filter: DayAllocationFilter): Observable<any> {
    return this.get(this.endpoint, filter);
  }

  getresourceCapacityBySgId(filter: OverAllResourceCapacity): Observable<any> {
    return this.get(this.endpoint, filter);
  }
  //#endregion query

  //#region operations

  //#endregion operations
}
