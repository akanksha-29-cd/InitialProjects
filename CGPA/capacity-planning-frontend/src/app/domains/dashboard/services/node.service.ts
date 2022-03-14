//#region imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//#endregion imports

//#region internal imports
import { HttpProvider } from 'src/app/core/common/http-provider.service';
import { Dashboard } from 'src/app/core/model/dashboard/entities/_module';
import { DayAllocationFilter } from '../parameters/_module';

//#endregion internal imports

@Injectable({
  providedIn: 'root',
})
export class NodeService extends HttpProvider {
  private readonly endpoint = 'allocatedCapacity';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  //#region  query
  getDashboardCapacity(filter: DayAllocationFilter): Observable<any> {
    return this.get(this.endpoint, filter);
  }
  //#endregion query
}
