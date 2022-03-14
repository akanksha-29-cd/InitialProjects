//#region Imports
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
@Injectable()
export class APIErrorInterceptor implements HttpInterceptor {

  constructor(
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.toaster.warning(error.error.message, 'Warning');
        } else {
          this.toaster.error('Some thing went wrong', 'Error');
        }
        this.spinner.hide();
        return throwError(error);
      })
    );
  }

}
