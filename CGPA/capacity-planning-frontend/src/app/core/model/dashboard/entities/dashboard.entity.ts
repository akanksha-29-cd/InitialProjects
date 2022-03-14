//#region Internal imports
import { EntityWithKey } from 'src/app/core/common/entity';
import { DashboardCapacityContext } from './capacity-context.entity';
//#endregion Internal Imports

export interface Dashboard extends EntityWithKey<string> {
    id:string;
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
    totalCapacity:string;
    capacities:DashboardCapacityContext[];
   
}
