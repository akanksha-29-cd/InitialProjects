//#region Internal Imports
import { CapacityContext } from 'src/app/core/model/capacity-planning/entities/_module';
//#endregion Internal Imports

export interface AddReourceCapacityParameter {
  sgId: string;
  resourceId: string;
  resourceName: string;
  businessUnitId: string;
  businessUnit: string;
  projectId: string;
  projectName: string;
  otp: string;
  projectType: string;
  roleName: string;
  roleId: string;
  teamId: string;
  teamName: string;
  teamType: string;
  year: string;
  capacities: CapacityContext[];
  active: boolean;
}
