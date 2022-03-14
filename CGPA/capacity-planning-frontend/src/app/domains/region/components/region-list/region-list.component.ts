//#region Imports
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
//#endregion Imports

//#region Internal Imports
import { RegionComponent } from '../../common/region.component';
import { RegionService } from '../../services/region.service';
import { Region } from 'src/app/core/model/region/entities/_module';
//#endregion Internal Imports
@Component({
  selector: 'reg-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
})
export class RegionListComponent extends RegionComponent {
  //#region Variable Declarations
  regionDialogue = false;
  regionCapacityDialogue = false;
  regions$: Observable<Region[]>;
  subject = new Subject();
  region: Region;
  formTitle: string;
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(private service: RegionService) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {
    this.regions$ = this.subject.asObservable().pipe(
      startWith(0),
      switchMap(() => this.service.getRegions())
    );
  }

  //#endregion Initialization Method

  //#region Action Methods
  openRegionDialogue() {
    this.region = {
      id: '',
      name: '',
      active: true,
    };
    this.regionDialogue = true;
    this.formTitle = 'Add Region';
  }

  openRegionCapacityDialogue(region: Region) {

    this.regionCapacityDialogue = true;
    this.formTitle = 'Manage Regional Capacity';
    this.region = region;
  }

  deleteRegion(region: Region) {

    this.service.updateRegion({id: region.id, name: region.name, active: false}).subscribe(() => {
      this.subject.next();
      this.toasterService.success('Region Deleted sucessfully', 'Success');
    });
  }

  editRegion(region: Region) {
    this.region = region;
    this.formTitle = 'Update Region';
    this.regionDialogue = true;
  }
  //#endregion Action Methods

  //#region  Events
  onRegionDialogue(toggleDialogue: boolean) {
    this.regionDialogue = toggleDialogue;
  }

  onRegionCapacityDialogue(toggleDialogue: boolean) {
    this.regionCapacityDialogue = toggleDialogue;
  }

  onsuccessOperation(isSuceess: boolean) {
    if (isSuceess) {
      this.subject.next();
    }
  }
  //#endregion Events
}
