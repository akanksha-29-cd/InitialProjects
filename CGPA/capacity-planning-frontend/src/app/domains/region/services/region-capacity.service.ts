//#region imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import * as RegionCapacityParameter from '../parameters/_module';
//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class RegionCapacityService extends HttpProvider {
  private readonly getEndpoint = 'region_capacities_by_region/' 
  private readonly saveEndpoint = 'region_capacity/';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getRegionCapacitiesByRegionId(regionId: { regionId: string }): Observable<any> {
    return this.get(this.getEndpoint, regionId);
  }

  //#endregion query

  //#region operations
  saveRegionCapacity(
    parameter: RegionCapacityParameter.AddRegionCapacityParameter[]
  ): Observable<any> {
    return this.post(this.saveEndpoint, parameter);
  }

  updateRegionCapacity(
    parameter: RegionCapacityParameter.UpdateRegionCapacityParameter[]
  ): Observable<any> {
    return this.put(this.saveEndpoint, parameter);
  }
  //#endregion operations
}
