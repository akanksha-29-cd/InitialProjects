//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import {
  AddReourceCapacityParameter,
  DayAllocationFilter,
  RemoveReourceCapacityParameter,
  UpdateReourceCapacityParameter,
} from '../parameters/_module';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class CapacityPlanningService extends HttpProvider {
  private readonly endpoint = 'capacity';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getCapacity(filter: DayAllocationFilter): Observable<any> {
    return this.get(this.endpoint, filter);
  }

  //#endregion query

  //#region operations
  saveResourceCapacity(
    parameter: AddReourceCapacityParameter[]
  ): Observable<any> {
    return this.post(this.endpoint, parameter);
  }

  updateResourceCapacity(
    parameter: UpdateReourceCapacityParameter[]
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }

  deleteResourceCapacity(
    parameter: UpdateReourceCapacityParameter[]
  ): Observable<any> {
    return this.put(this.endpoint, parameter);
  }
  //#endregion operations
}
