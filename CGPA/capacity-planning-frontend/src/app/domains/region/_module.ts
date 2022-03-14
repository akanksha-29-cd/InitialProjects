//#region Internal Imports
import { RegionCapacityFormComponent } from './components/region-capacity-form/region-capacity-form.component';
import { RegionFormComponent } from './components/region-form/region-form.component';
import { RegionListComponent } from './components/region-list/region-list.component';
//#endregion Internal Imports

export const RegionComponents: any[] = [
  RegionListComponent,
  RegionFormComponent,
  RegionCapacityFormComponent
];

//#region Exports All Module
export * from './components/region-list/region-list.component';
export * from './components/region-form/region-form.component';
export * from './components/region-capacity-form/region-capacity-form.component';
//#endregion Exports All Module
