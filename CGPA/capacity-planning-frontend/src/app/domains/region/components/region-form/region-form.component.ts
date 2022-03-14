//#region Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
//#endregion Imports

//#region Internal Imports
import { RegionComponent } from '../../common/region.component';
import {
  Region,
} from 'src/app/core/model/region/entities/_module';
import {
  AddRegionParameter,
  UpdateRegionParameter,
} from '../../parameters/_module';
import { RegionService } from '../../services/region.service';
//#endregion Internal Imports
@Component({
  selector: 'reg-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.scss'],
})
export class RegionFormComponent extends RegionComponent {
  //#region Variable Declarations
  @Input() regionDialogue: boolean;
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() formTitle: string;
  @Input() region: Region;
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

  initialize() {}

  //#endregion Initialization Method

  //#region Action Methods
  hideDialogue() {
    this.regionDialogue = false;
    this.diaologue.emit(this.regionDialogue);
  }

  saveRegion(formValues: any) {
    if (this.region.id) {
      this.updateRegion(formValues);
    } else {
      this.addNewRegion(formValues);
    }
    this.hideDialogue();
  }

  addNewRegion(formValues: any) {
    const parameter: AddRegionParameter = {
      name: formValues.regionName,
      active: true,
    };
    this.service.saveRegion(parameter).subscribe(() => {
      this.toasterService.success('Region Saved sucessfully', 'Success');
      this.successOperation.emit(true);
      this.hideDialogue();
    });
  }

  updateRegion(formValues: any) {
    const parameter: UpdateRegionParameter = {
      id: this.region.id,
      name: formValues.regionName,
      active: true,
    };
    this.service.updateRegion(parameter).subscribe(() => {
      this.toasterService.success('Region Saved sucessfully', 'Success');
      this.hideDialogue();
    });
    this.successOperation.emit(true);
  }
  //#endregion Action Methods

  //#region  Events

  //#endregion Events
}
