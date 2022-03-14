//#region imports
import { Injectable } from '@angular/core';
//#endregion imports

//#region Internal Imports
import { Dashboard } from 'src/app/core/model/dashboard/entities/_module';
//#endregion Internal Imports

@Injectable({
  providedIn: 'root',
})
export class DayAllocationReportMapper {
  //#region Variable Declarations
  //#endregion Variable Declarations
  
  //#region Mapping Data
  initializeDefaultCapacity(): Dashboard {
    return {
      id: '',
      sgId: '',
      resourceId: '',
      resourceName: '',
      businessUnitId: '',
      businessUnit: '',
      projectId: '',
      projectName: '',
      otp: '',
      projectType: '',
      roleId: '',
      roleName: '',
      teamId: '',
      teamName: '',
      teamType: '',
      year: '0',
      totalCapacity:'',
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
  }
}

}
