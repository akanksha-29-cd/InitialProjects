//#region Imports
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Table } from 'src/app/primeng.module';
import * as _ from 'lodash';
//#endregion Imports

//#region Internal Imports
import { RegionComponent } from '../../common/region.component';
import { Region } from 'src/app/core/model/region/entities/_module';
import {
  AddRegionCapacityParameter,
  AddRegionParameter,
  UpdateRegionCapacityParameter,
  UpdateRegionParameter,
} from '../../parameters/_module';
import { RegionCapacity } from 'src/app/core/model/region/entities/region-capacity.entity';
import { forkJoin, Observable } from 'rxjs';
import { RegionCapacityService } from '../../services/region-capacity.service';
//#endregion Internal Imports
@Component({
  selector: 'reg-region-capacity-form',
  templateUrl: './region-capacity-form.component.html',
  styleUrls: ['./region-capacity-form.component.scss'],
})
export class RegionCapacityFormComponent
  extends RegionComponent
  implements OnChanges
{
  //#region Variable Declarations
  @Input() regionCapacityDialogue: boolean;
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() formTitle: string;
  @Input() region: Region;

  regionCapacities: RegionCapacity[] = [];
  addParameters: AddRegionCapacityParameter[] = [];
  updateParameters: UpdateRegionCapacityParameter[] = [];
  isRowEditMode: boolean;
  @ViewChild(Table) private dataTable: Table;
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(private service: RegionCapacityService) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.region != undefined && changes.regionCapacityDialogue?.currentValue) {
      this.service
        .getRegionCapacitiesByRegionId({ regionId: this.region.id })
        .subscribe((capacities) => {
          this.regionCapacities = _.orderBy(capacities, ['year'], ['desc']);
          if (this.regionCapacities.length === 0) {
            this.regionCapacities.push(this.initializeRegionCapacity());
          }
        });
    }
  }
  //#endregion Initialization Method

  //#region Action Methods
  addNewRow() {
    if (this.isRowEditMode) {
      this.toasterService.warning(
        'Your row is in edit mode',
        'Validation Error'
      );
      return;
    }
    this.regionCapacities.splice(
      this.dataTable._first,
      0,
      this.initializeRegionCapacity()
    );
    this.isRowEditMode = true;
  }

  removeRow(index: number) {
    this.regionCapacities.splice(index, 1);
    this.isRowEditMode = false;
  }

  rowEditInit() {
    this.isRowEditMode = true;
  }

  rowEditSave(regionCapacity: RegionCapacity) {
    if (regionCapacity.id.length === 0) {
      this.mapAddParameter(regionCapacity);
    } else {
      this.mapUpdateParameter(regionCapacity);
    }
    this.isRowEditMode = false;
  }

  rowEditCancel(regionCapacity: RegionCapacity, index: number) {
    this.isRowEditMode = false;
  }

  hideDialogue() {
    this.regionCapacityDialogue = false;
    this.diaologue.emit(this.regionCapacityDialogue);
  }

  saveRegionCapacities(): boolean {
    const all$: Observable<any>[] = [];

    if (this.addParameters.length === 0 && this.updateParameters.length === 0) {
      this.toasterService.info('No changes to save', 'Info');
      return false;
    } else {
      if (this.addParameters.length > 0) {
        all$.push(this.service.saveRegionCapacity(this.addParameters));
      }
      if (this.updateParameters.length > 0) {
        all$.push(this.service.updateRegionCapacity(this.updateParameters));
      }
      const process$ = forkJoin(all$);
      process$.subscribe((success) => {
        this.toasterService.success('Capacities saved successfully', 'Success');
        this.addParameters = [];
        this.updateParameters = [];
        this.regionCapacities = [];
      });
    }

    this.hideDialogue();
  }

  addNewRegion(formValues: any) {
    const parameter: AddRegionParameter = {
      name: formValues.regionName,
      active: true,
    };
    // this.service.saveRegion(parameter).subscribe(() => {
    //   this.toasterService.success('Region Saved sucessfully', 'Success');
    //   this.hideDialogue();
    // });
  }

  updateRegion(formValues: any) {
    const parameter: UpdateRegionParameter = {
      id: this.region.id,
      name: formValues.regionName,
      active: true,
    };
    // this.service.updateRegion(parameter).subscribe(() => {
    //   this.toasterService.success('Region Saved sucessfully', 'Success');
    //   this.hideDialogue();
    // });
  }
  //#endregion Action Methods

  //#region  Events

  //#endregion Events

  //#region Helper Methods

  initializeRegionCapacity(): RegionCapacity {
    return {
      id: '',
      year:
        this.regionCapacities.length > 0
          ? _.max(this.regionCapacities.map((capacity) => capacity.year)) + 1
          : new Date().getFullYear(),
      region: { id: this.region.id, name: this.region.name },
      capacities: [
        { month: '1', capacity: '0' },
        { month: '2', capacity: '0' },
        { month: '3', capacity: '0' },
        { month: '4', capacity: '0' },
        { month: '5', capacity: '0' },
        { month: '6', capacity: '0' },
        { month: '7', capacity: '0' },
        { month: '8', capacity: '0' },
        { month: '9', capacity: '0' },
        { month: '10', capacity: '0' },
        { month: '11', capacity: '0' },
        { month: '12', capacity: '0' },
      ],
    };
  }

  mapAddParameter(regionCapacity: RegionCapacity) {
    this.addParameters.push({
      year: regionCapacity.year,
      region: regionCapacity.region,
      capacities: regionCapacity.capacities,
    });
  }

  mapUpdateParameter(regionCapacity: RegionCapacity) {
    if (
      this.updateParameters.filter(
        (capacity) => capacity.id === regionCapacity.id
      ).length > 0
    ) {
      let index = this.updateParameters.findIndex(
        (capacity) => capacity.id === regionCapacity.id
      );
      this.updateParameters.splice(index);
    }
    this.updateParameters.push({
      id: regionCapacity.id,
      year: regionCapacity.year,
      region: regionCapacity.region,
      capacities: regionCapacity.capacities,
    });
  }
  //#endregion Helper Methods
}
