//#region Imports
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
//#endregion Imports

//#region Internal Imports

//#endregion Internal Imports

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  //#region Constructor Methods
  constructor(private spinner: NgxSpinnerService) {}
  //#endregion Constructor Methods

  //#region Intercept Methods
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
        return event;
      })
    );
  }
  //#endregion Intercept Methods

  //#region Helpers Methods
  //#endregion Helpers Methods
}
