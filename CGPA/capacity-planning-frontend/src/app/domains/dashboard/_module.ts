//#region Internal Imports
import { DayAllocationComponent } from './components/day-allocation/day-allocation.component';
import { DayAllocationReportComponent } from './components/day-allocation-report/day-allocation-report.component';
import { DayAllocationFilterComponent } from './components/day-allocation-filter/day-allocation-filter.component';
//#endregion Internal Imports

export const DashboardComponents: any[] = [
  DayAllocationComponent,
  DayAllocationFilterComponent,
  DayAllocationReportComponent,
];

//#region Exports All Module
export * from './components/day-allocation/day-allocation.component';
export * from './components/day-allocation-report/day-allocation-report.component';
export * from './components/day-allocation-filter/day-allocation-filter.component';
//#endregion Exports All Module
