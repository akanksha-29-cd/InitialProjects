//#region Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { PrimeNgControls } from './primeng.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
//#endregion Imports

//#region Internal Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { translateLoaderFactory } from './core/common/translation.loader';
import { LayoutComponents } from './core/layout/_module';
import { DashboardComponents } from './domains/dashboard/_module';
import { AuthenticationComponents } from './domains/authentication/_module';
import { ResourceComponents } from './domains/resource/_module';
import { AppInjector } from './core/common/app.injector';
import { ProjectComponents } from './domains/project/_module';
import { RegionComponents } from './domains/region/_module';
import { RoleComponents } from './domains/role/_module';
import { DropdownToValuePipe } from './core/pipes/dropdown-to-value.pipe';
import { CapacityPlanningApiInterceptor } from './core/interceptor/capacity-planning-api.interceptor';
import { LoaderInterceptor } from './core/interceptor/loader.interceptor';
import { TeamComponents } from './domains/team/_module';
import { APIErrorInterceptor } from './core/interceptor/apierror.interceptor';
import { ProjectTypeComponents } from './domains/projectType/_module';

//#endregion //#region Internal Imports

@NgModule({
  declarations: [
    AppComponent,
    ...LayoutComponents,
    ...DashboardComponents,
    ...ResourceComponents,
    ...ProjectComponents,
    ...AuthenticationComponents,
    ...RegionComponents,
    ...TeamComponents,
    ...RoleComponents,
    ...TeamComponents,
    ...ProjectTypeComponents,
    DropdownToValuePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...PrimeNgControls,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CapacityPlanningApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIErrorInterceptor,
      multi: true,
    }
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}
