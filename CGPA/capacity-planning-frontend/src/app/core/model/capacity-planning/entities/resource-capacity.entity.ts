//#region Internal imports
import { EntityWithKey } from 'src/app/core/common/entity';
import { CapacityContext } from './capacity-context.entity';
//#endregion Internal Imports

export interface ResourceCapacity extends EntityWithKey<string> {
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
  isNew: boolean;
  isupdated: boolean;
  isDeleted: boolean;
  capacities: CapacityContext[];
  active: boolean;
}
