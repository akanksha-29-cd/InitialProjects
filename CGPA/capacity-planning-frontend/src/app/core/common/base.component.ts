//#region Imports
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
//#endregion Imports

//#region Internal Imports
import { AppInjector } from './app.injector';
//#endregion Internal Imports

export abstract class BaseComponent {
  //#region Variables Declarations
  protected toasterService: ToastrService;
  protected translateService: TranslateService;
  //#endregion Variables Declarations

  //#region  Constructor
  protected constructor() {
    const injector = AppInjector.getInjector();
    this.toasterService = injector.get(ToastrService);
    this.translateService = injector.get(TranslateService);
  }
  //#endregion Constructor
}
