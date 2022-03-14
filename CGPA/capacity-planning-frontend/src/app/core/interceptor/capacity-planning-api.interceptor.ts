import { environment } from 'src/environments/environment';
//#region Imports
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion Imports

//#region Internal Imports

//#endregion Internal Imports

@Injectable()
export class CapacityPlanningApiInterceptor implements HttpInterceptor {
  //#region Constructor Methods
  constructor() {}
  //#endregion Constructor Methods

  //#region Intercept Methods
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: new HttpHeaders({
        // Authorization: 'Bearer ' + this._authService.getToken(), //Will use during time of authentication
        'content-type': 'application/json; charset=utf-8',
        'Ocp-Apim-Subscription-Key': environment.apiSubsKey
      }),
    });
    return next.handle(request);
  }
  //#endregion Intercept Methods

  //#region Helpers Methods
  //#endregion Helpers Methods
}
