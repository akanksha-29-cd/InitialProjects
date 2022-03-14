//#region Imports
import { Subject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
//#endregion Imports

//#region Internal Imports
import { BaseComponent } from 'src/app/core/common/base.component';
//#endregion Internal Imports

export abstract class DashboardComponent extends BaseComponent implements OnInit, OnDestroy {
  //#region Variable Declarations
  //#endregion Variable Declarations

  //#region Subjects
  protected destroy$ = new Subject<boolean>();
  //#endregion Subjects

  //#region  Constructor
  constructor() {
    super();
  }
  //#endregion Constructor

  //#region Initialization
  ngOnInit() {
    this.viewInit();
  }

  abstract viewInit();
  //#endregion Initialization

  //#region Destroy
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //#endregion Destroy
}
