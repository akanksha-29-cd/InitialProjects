//#region imports
import { Injectable } from '@angular/core';
//#endregion imports

//#region Internal Imports
import {
  RegionCapacity,
  RegionCapacityContext,
  ResourceCapacity,
} from 'src/app/core/model/capacity-planning/entities/_module';
import { Dashboard } from 'src/app/core/model/dashboard/entities/_module';
import {
  AddReourceCapacityParameter,
  RemoveReourceCapacityParameter,
  UpdateReourceCapacityParameter,
} from '../../../parameters/_module';
//#endregion Internal Imports

@Injectable({
  providedIn: 'root',
})
export class DayAllocationMapper {
  //#region Variable Declarations
  //#endregion Variable Declarations

  //#region Mapping Data
  dayAllocationGridColumns(): string[] {
    return [
      'Remove',
      'Edit',
      'BU',
      'Project Name',
      'Team',
      'Resource Role',
      'Resource Name',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Total',
      'Q1',
      'Q2',
      'Q3',
      'Q4',
    ];
  }
  initializeDefaultCapacity(): ResourceCapacity {
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
      isNew: true,
      isupdated: false,
      isDeleted: false,
      capacities: [
        { month: '1', capacity: '0', totalCapacity: '0' },
        { month: '2', capacity: '0', totalCapacity: '0' },
        { month: '3', capacity: '0', totalCapacity: '0' },
        { month: '4', capacity: '0', totalCapacity: '0' },
        { month: '5', capacity: '0', totalCapacity: '0' },
        { month: '6', capacity: '0', totalCapacity: '0' },
        { month: '7', capacity: '0', totalCapacity: '0' },
        { month: '8', capacity: '0', totalCapacity: '0' },
        { month: '9', capacity: '0', totalCapacity: '0' },
        { month: '10', capacity: '0', totalCapacity: '0' },
        { month: '11', capacity: '0', totalCapacity: '0' },
        { month: '12', capacity: '0', totalCapacity: '0' },
      ],
      active: true,
    };
  }

  initializeDefaultOverAllResourceCapacity(): Dashboard {
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
      totalCapacity: '',
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

  addNewCapacity(
    capacities: ResourceCapacity[],
    regionCapacity: RegionCapacity
  ): AddReourceCapacityParameter[] {
    const parameter: AddReourceCapacityParameter[] = [];
    capacities
      .filter((value) => value.id)
      .map((capacity) => {
        parameter.push({
          sgId: capacity.sgId,
          resourceId: capacity.resourceId,
          resourceName: capacity.resourceName,
          businessUnitId: capacity.businessUnitId,
          businessUnit: capacity.businessUnit,
          projectId: capacity.projectId,
          projectName: capacity.projectName,
          otp: capacity.otp,
          projectType: capacity.projectType,
          roleId: capacity.roleId,
          roleName: capacity.roleName,
          teamId: capacity.teamId,
          teamName: capacity.teamName,
          teamType: capacity.teamType,
          year: '2021',
          capacities: [
            {
              month: '1',
              capacity: capacity.capacities[0].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[0].capacity,
            },
            {
              month: '2',
              capacity: capacity.capacities[1].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[1].capacity,
            },
            {
              month: '3',
              capacity: capacity.capacities[2].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[2].capacity,
            },
            {
              month: '4',
              capacity: capacity.capacities[3].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[3].capacity,
            },
            {
              month: '5',
              capacity: capacity.capacities[4].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[4].capacity,
            },
            {
              month: '6',
              capacity: capacity.capacities[5].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[5].capacity,
            },
            {
              month: '7',
              capacity: capacity.capacities[6].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[6].capacity,
            },
            {
              month: '8',
              capacity: capacity.capacities[7].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[7].capacity,
            },
            {
              month: '9',
              capacity: capacity.capacities[8].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[8].capacity,
            },
            {
              month: '10',
              capacity: capacity.capacities[9].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[9].capacity,
            },
            {
              month: '11',
              capacity: capacity.capacities[10].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[10].capacity,
            },
            {
              month: '12',
              capacity: capacity.capacities[11].capacity,
              totalCapacity: this.getRegionalCapacity(
                capacity.teamType,
                regionCapacity
              )[11].capacity,
            },
          ],
          active: true,
        });
      });
    return parameter;
  }

  updateCapacity(
    capacities: ResourceCapacity[],
    regionCapacity: RegionCapacity,
    active: boolean
  ): UpdateReourceCapacityParameter[] {
    const parameter: UpdateReourceCapacityParameter[] = [];
    capacities.map((capacity) => {
      parameter.push({
        id: capacity.id,
        sgId: capacity.sgId,
        resourceId: capacity.resourceId,
        resourceName: capacity.resourceName,
        businessUnitId: capacity.businessUnitId,
        businessUnit: capacity.businessUnit,
        projectId: capacity.projectId,
        projectName: capacity.projectName,
        otp: capacity.otp,
        projectType: capacity.projectType,
        roleId: capacity.roleId,
        roleName: capacity.roleName,
        teamId: capacity.teamId,
        teamName: capacity.teamName,
        teamType: capacity.teamType,
        year: '2021',
        capacities: [
          {
            month: '1',
            capacity: capacity.capacities[0].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[0].capacity,
          },
          {
            month: '2',
            capacity: capacity.capacities[1].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[1].capacity,
          },
          {
            month: '3',
            capacity: capacity.capacities[2].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[2].capacity,
          },
          {
            month: '4',
            capacity: capacity.capacities[3].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[3].capacity,
          },
          {
            month: '5',
            capacity: capacity.capacities[4].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[4].capacity,
          },
          {
            month: '6',
            capacity: capacity.capacities[5].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[5].capacity,
          },
          {
            month: '7',
            capacity: capacity.capacities[6].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[6].capacity,
          },
          {
            month: '8',
            capacity: capacity.capacities[7].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[7].capacity,
          },
          {
            month: '9',
            capacity: capacity.capacities[8].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[8].capacity,
          },
          {
            month: '10',
            capacity: capacity.capacities[9].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[9].capacity,
          },
          {
            month: '11',
            capacity: capacity.capacities[10].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[10].capacity,
          },
          {
            month: '12',
            capacity: capacity.capacities[11].capacity,
            totalCapacity: this.getRegionalCapacity(
              capacity.teamType,
              regionCapacity
            )[11].capacity,
          },
        ],
        active,
      });
    });
    return parameter;
  }

  // TODO:Remove this method in future if we don't required to delete the capacity
  deleteCapacity(
    capacities: ResourceCapacity[]
  ): RemoveReourceCapacityParameter[] {
    const parameter: RemoveReourceCapacityParameter[] = [];
    capacities.map((capacity) => {
      parameter.push({ id: capacity.id });
    });
    return parameter;
  }
  //#endregion Mapping Data

  //#region Helper Method
  getRegionalCapacity(
    teamType: string,
    regionCapacity: RegionCapacity
  ): RegionCapacityContext[] {
    const region = teamType === 'INDEC' ? 'IN' : 'FR';
    return regionCapacity.capacities.filter(
      (type: RegionCapacityContext) => type.region === region
    );
  }
  //#endregion Helper Method
}
