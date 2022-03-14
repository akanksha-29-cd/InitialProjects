//#region Imports
import { Component, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Table } from 'primeng/table';
//#endregion Imports

//#region Internal Imports
import { DashboardComponent } from '../../common/dashboard.component';
import {
  AddReourceCapacityParameter,
  DayAllocationFilter,
  UpdateReourceCapacityParameter,
} from '../../parameters/_module';
import { CapacityPlanningService } from '../../services/capacity-planning.service';
import { DashboardService } from '../../services/dashboard.service';
import { ResourceService } from 'src/app/domains/resource/services/resource.service';
import { ProjectService } from 'src/app/domains/project/services/project.service';
import { BusinessUnitService } from 'src/app/core/services/business-unit.service';
import { TeamService } from 'src/app/core/services/team.service';
import { ResourceRoleService } from 'src/app/core/services/resource-roles.service';
import { RegionCapacityService } from '../../services/region-capacity.service';
import { BusinessUnit } from 'src/app/core/model/business-unit/entities/_module';
import { Team } from 'src/app/core/model/team/entities/_module';
import { Project } from 'src/app/core/model/project/entities/_module';
import {
  Resource,
  ResourceRole,
} from 'src/app/core/model/resource/entities/_module';
import {
  RegionCapacity,
  ResourceCapacity,
} from 'src/app/core/model/capacity-planning/entities/_module';
import { DayAllocationMapper } from './helpers/day-allocation.mapper';
import { Dashboard } from 'src/app/core/model/dashboard/entities/_module';
//#endregion Internal Imports

@Component({
  selector: 'das-day-allocation',
  templateUrl: './day-allocation.component.html',
  styleUrls: ['./day-allocation.component.scss'],
})
export class DayAllocationComponent extends DashboardComponent {
  //#region Variable Declarations
  businessUnits$: Observable<BusinessUnit[]>;
  teams$: Observable<Team[]>;
  resources$: Observable<Resource[]>;
  projects$: Observable<Project[]>;
  resourceRoles$: Observable<ResourceRole[]>;
  regionCapacities$: Observable<RegionCapacity[]>;

  capacityColumns: string[] = [];
  capacityValues: ResourceCapacity[] = [];
  fileteredCapacityValues: ResourceCapacity[] = [];
  overAllResourceCapacity: Dashboard;
  overAllResourceCapacities: Dashboard[] = [];
  projectsByBusinessUnits: Project[] = [];
  roleByTeam: ResourceRole[];
  resourceByRole: Resource[] = [];
  newCapacity: AddReourceCapacityParameter[] = [];
  editedCapacity: UpdateReourceCapacityParameter[] = [];
  removedCapacity: UpdateReourceCapacityParameter[] = [];
  isRowEditMode: boolean;

  @ViewChild(Table) private dataTable: Table;
  //#endregion Variable Declarations

  //#region Constructor
  constructor(
    private service: CapacityPlanningService,
    private dashboardService: DashboardService,
    private regionService: RegionCapacityService,
    private businessUnitService: BusinessUnitService,
    private resourceService: ResourceService,
    private projectService: ProjectService,
    private resourceRoleService: ResourceRoleService,
    private teamService: TeamService,
    private helper: DayAllocationMapper
  ) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {
    this.regionCapacities$ = this.regionService.getRegionCapacity({
      year: 2021,
    });
    this.businessUnits$ = this.businessUnitService.getBusinessUnits();
    this.teams$ = this.teamService.getTeams();
    this.resources$ = this.resourceService.getResources();
    this.projects$ = this.projectService.getprojects();
    this.resourceRoles$ = this.resourceRoleService.getResourceRoles();

    this.capacityColumns = this.helper.dayAllocationGridColumns();

    this.service.getCapacity({ year: '2021' }).subscribe((capacity) => {
      this.capacityValues = capacity;
      this.fileteredCapacityValues = this.capacityValues.map((x) =>
        Object.assign({}, x)
      );
    });
    this.initializeOverAllResourceCapcityValues();
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
    if (this.validateData()) {
      this.fileteredCapacityValues.splice(
        this.dataTable._first,
        0,
        this.helper.initializeDefaultCapacity()
      );
      this.dataTable.totalRecords = this.fileteredCapacityValues.length;
      this.isRowEditMode = true;
    } else {
      this.toasterService.error(
        'Please enter all required field',
        'Validation Error'
      );
    }
  }

  removeRow(index: number) {
    this.fileteredCapacityValues.splice(index, 1);
    this.dataTable._totalRecords = this.fileteredCapacityValues.length;
    this.isRowEditMode = false;
  }

  rowEditInit(
    capacity: ResourceCapacity,
    projects: Project[],
    resources: Resource[]
  ) {
    // TODO:OLDCapacity ==> Local Stotrage usage is a bad practice followed. Need to check for some better solution.
    this.getProjectByBusinessunitId(capacity.businessUnitId, projects);
    this.getRolesByTeamId(capacity.teamId, resources);
    this.getResourceByRoleId(capacity.roleId, resources);
    if (capacity.isNew === undefined) {
      localStorage.setItem('oldCapacity', JSON.stringify(capacity));
    }
    if (capacity.resourceId) {
      this.setOverAllResourceCapacity(capacity.sgId);
    }
    this.isRowEditMode = true;
  }

  rowEditSave(
    capacity: ResourceCapacity,
    index: number,
    businessUnits: BusinessUnit[],
    projects: Project[],
    roles: ResourceRole[],
    resources: Resource[],
    teams: Team[]
  ) {
    this.setLabelForDropdown(
      index,
      businessUnits,
      projects,
      roles,
      resources,
      teams
    );
    const tableRow = document.getElementById('row_' + index);
    if (capacity.isNew) {
      this.fileteredCapacityValues[index].id = 'new' + index;
      tableRow.style.backgroundColor = '#aee4ae';
    } else {
      tableRow.style.backgroundColor = 'azure';
      localStorage.removeItem('oldCapacity');
      this.fileteredCapacityValues[index].isupdated = true;
    }
    this.isRowEditMode = false;
  }

  rowEditCancel(capacity: ResourceCapacity, index: number) {
    if (capacity.isNew === undefined) {
      this.fileteredCapacityValues[index] = JSON.parse(
        localStorage.getItem('oldCapacity')
      );
      localStorage.removeItem('oldCapacity');
    }
    this.isRowEditMode = false;
    this.initializeOverAllResourceCapcityValues();
  }

  delete(index: number, value: any) {
    const tableRow = document.getElementById('row_' + index);
    if (value.checked) {
      tableRow.style.backgroundColor = '#f9e3e3';
      this.fileteredCapacityValues[index].isDeleted = true;
    } else {
      tableRow.style.backgroundColor = '#ffffff';
      this.fileteredCapacityValues[index].isDeleted = false;
    }
  }

  processRecord(regionCapacity: RegionCapacity[]): boolean {
    const all$: Observable<any>[] = [];
    this.mapData(regionCapacity[0]);
    if (
      this.newCapacity.length === 0 &&
      this.editedCapacity.length === 0 &&
      this.removedCapacity.length === 0
    ) {
      this.toasterService.info('No Data to process', 'Info');
      return false;
    } else {
      if (this.newCapacity.length > 0) {
        all$.push(this.service.saveResourceCapacity(this.newCapacity));
      }
      if (this.editedCapacity.length > 0) {
        all$.push(this.service.updateResourceCapacity(this.editedCapacity));
      }
      if (this.removedCapacity.length > 0) {
        all$.push(this.service.deleteResourceCapacity(this.removedCapacity));
      }
    }
    const process$ = forkJoin(all$);
    process$.subscribe((success) => {
      this.toasterService.success('Record processed successfully', 'Success');
      this.newCapacity = [];
      this.editedCapacity = [];
      this.capacityValues = [];
      this.fileteredCapacityValues = [];
      this.service.getCapacity({ year: '2021' }).subscribe((capacity) => {
        this.capacityValues = capacity;
        this.fileteredCapacityValues = this.capacityValues.map((x) =>
          Object.assign({}, x)
        );
      });
      return true;
    });
  }

  validateMonthlyResourceCapacity(
    resourceId: string,
    regionCapacities: RegionCapacity[],
    month: number
  ): string {
    let totalResourceCapacityPerMonth = 0;
    let teamType;
    if (resourceId) {
      const resourceCapacities = [
        ...this.capacityValues.filter(
          (value) => value.resourceId === resourceId
        ),
      ];
      const fileterResourceCapacities = [
        ...this.fileteredCapacityValues
          .filter((value) => value.resourceId === resourceId)
          .filter((x) => x.id.startsWith('new') || x.id === ''),
      ];
      if (resourceCapacities.length > 0) {
        teamType = resourceCapacities[0].teamType;
      } else {
        teamType = fileterResourceCapacities[0].teamType;
      }
      const capacityByResourceType = this.helper.getRegionalCapacity(
        teamType,
        regionCapacities[0]
      );
      resourceCapacities.forEach((element) => {
        totalResourceCapacityPerMonth += parseInt(
          element.capacities[month].capacity,
          0
        );
      });

      fileterResourceCapacities.forEach((element) => {
        totalResourceCapacityPerMonth += parseInt(
          element.capacities[month].capacity,
          0
        );
      });

      if (
        totalResourceCapacityPerMonth <=
        parseInt(capacityByResourceType[month].capacity, 0)
      ) {
        return 'fewer-capacity';
      }
      if (
        totalResourceCapacityPerMonth >
        parseInt(capacityByResourceType[month].capacity, 0)
      ) {
        return 'exceeded-capacity';
      }
    } else {
      return null;
    }
  }
  //#endregion Action Methods

  //#region Event Methods
  onFilter(data: DayAllocationFilter) {
    this.overAllResourceCapacities = [];
    this.fileteredCapacityValues = this.capacityValues.map((x) =>
      Object.assign({}, x)
    );
    if (data.businessUnitId) {
      this.fileteredCapacityValues = this.capacityValues
        .filter((bu) => bu.businessUnitId === data.businessUnitId)
        .map((x) => Object.assign({}, x));
    }
    if (data.projectId) {
      this.fileteredCapacityValues = this.capacityValues
        .filter((project) => project.projectId === data.projectId)
        .map((x) => Object.assign({}, x));
    }
    if (data.resourceId) {
      this.fileteredCapacityValues = this.capacityValues
        .filter((res) => res.resourceId === data.resourceId)
        .map((x) => Object.assign({}, x));
    }
    if (data.roleId) {
      this.fileteredCapacityValues = this.capacityValues
        .filter((role) => role.roleId === data.roleId)
        .map((x) => Object.assign({}, x));
    }
    if (data.teamId) {
      this.fileteredCapacityValues = [
        ...this.capacityValues.filter((team) => team.teamId === data.teamId),
      ];
    }
    this.dataTable._totalRecords = this.fileteredCapacityValues.length;
  }

  onReset(data: boolean) {
    this.overAllResourceCapacities = [];
    this.fileteredCapacityValues = this.capacityValues.map((x) =>
      Object.assign({}, x)
    );
    this.initializeOverAllResourceCapcityValues();
  }

  onBusinessUnitChange(buId: string, projects: Project[], index: number) {
    this.getProjectByBusinessunitId(buId, projects);
    this.fileteredCapacityValues[index].projectId = '';
    this.fileteredCapacityValues[index].projectName = '';
    this.fileteredCapacityValues[index].otp = '';
    this.fileteredCapacityValues[index].projectType = '';
  }

  onProjectChange(projectId: string, index: number) {
    const projectDetail = this.projectsByBusinessUnits.find(
      (project) => project.id === projectId
    );
    this.fileteredCapacityValues[index].otp = projectDetail.otp;
    this.fileteredCapacityValues[index].projectType = projectDetail.type.name;
  }

  onTeamChange(teamId: string, resources: Resource[], index: number) {
    this.getRolesByTeamId(teamId, resources);
    this.resourceByRole = [];
    this.fileteredCapacityValues[index].roleId = '';
    this.fileteredCapacityValues[index].roleName = '';
    this.fileteredCapacityValues[index].resourceId = '';
    this.fileteredCapacityValues[index].resourceName = '';
  }

  onRoleChange(roleId: string, resources: Resource[], index: number) {
    this.getResourceByRoleId(roleId, resources);
    this.fileteredCapacityValues[index].resourceId = '';
    this.fileteredCapacityValues[index].resourceName = '';
  }

  onResourceChange(resourceId: string, index: number) {
    const resource = this.resourceByRole.find(
      (value) => value.id === resourceId
    );
    this.fileteredCapacityValues[index].sgId = resource.sgId;
    this.fileteredCapacityValues[index].teamType = resource.teamType.name;
    this.setOverAllResourceCapacity(resource.sgId);
  }

  onValidateMonthlyResourceCapacity(
    resourceId: string,
    regionCapacities: RegionCapacity[],
    month: number
  ) {
    if (
      this.fileteredCapacityValues.find((val) => val.resourceId === resourceId)
        .capacities[month].capacity !== '0' &&
      this.validateMonthlyResourceCapacity(
        resourceId,
        regionCapacities,
        month
      ) === 'exceeded-capacity'
    ) {
      const capacityByResourceType = this.helper.getRegionalCapacity(
        this.fileteredCapacityValues.find(
          (val) => val.resourceId === resourceId
        ).teamType,
        regionCapacities[0]
      );
      this.toasterService.warning(
        `${
          this.fileteredCapacityValues.find(
            (val) => val.resourceId === resourceId
          ).teamType
        } Days for month of ${
          capacityByResourceType[month].month
        } should not be greater than ${capacityByResourceType[month].capacity}`,
        'Validation Message'
      );
    }
    this.recalculateOverAllCapacity(
      this.fileteredCapacityValues.find((val) => val.resourceId === resourceId)
        .sgId,
      month
    );
  }
  //#endregion Event Methods

  //#region Custom Get Methods
  getProjectByBusinessunitId(buId: string, projects: Project[]) {
    if (buId) {
      this.projectsByBusinessUnits = projects.filter(
        (project) => project.businessUnit.id === buId
      );
    }
  }

  getRolesByTeamId(teamId: string, resources: Resource[]) {
    if (teamId) {
      const roles = [];
      resources
        .filter((resource) => resource.team.id === teamId)
        .map((resource) => {
          resource.roles.map((role) => {
            roles.push(role);
          });
        });
      this.roleByTeam = _.uniqBy(roles, 'id');
    }
  }

  getResourceByRoleId(roleId: string, resources: Resource[]) {
    if (roleId) {
      this.resourceByRole = _.filter(resources, {
        roles: [{ id: roleId }],
      });
    }
  }

  //#endregion Custom Get Methods

  //#region Helper Methods
  setLabelForDropdown(
    index: number,
    businessUnits: BusinessUnit[],
    projects: Project[],
    roles: ResourceRole[],
    resources: Resource[],
    teams: Team[]
  ) {
    this.fileteredCapacityValues[index].businessUnit = businessUnits.find(
      (bu) => bu.id === this.fileteredCapacityValues[index].businessUnitId
    ).name;

    this.fileteredCapacityValues[index].projectName = projects.find(
      (project) => project.id === this.fileteredCapacityValues[index].projectId
    ).name;

    this.fileteredCapacityValues[index].roleName = roles.find(
      (role) => role.id === this.fileteredCapacityValues[index].roleId
    ).name;

    this.fileteredCapacityValues[index].resourceName = resources.find(
      (resource) =>
        resource.id === this.fileteredCapacityValues[index].resourceId
    ).name;
    this.fileteredCapacityValues[index].teamName = teams.find(
      (team) => team.id === this.fileteredCapacityValues[index].teamId
    ).name;
  }

  validateData(): boolean {
    if (
      this.fileteredCapacityValues.some(
        (value) =>
          value.businessUnitId &&
          value.projectId &&
          value.roleId &&
          value.resourceId &&
          value.isNew
      ) ||
      this.fileteredCapacityValues.filter((value) => value.isNew).length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  initializeOverAllResourceCapcityValues() {
    this.overAllResourceCapacity = this.helper.initializeDefaultOverAllResourceCapacity();
  }

  mapData(regionCapacity: RegionCapacity) {
    this.newCapacity = this.helper.addNewCapacity(
      this.fileteredCapacityValues.filter((values) => values.isNew),
      regionCapacity
    );
    this.editedCapacity = this.helper.updateCapacity(
      this.fileteredCapacityValues.filter((values) => values.isupdated),
      regionCapacity,
      true
    );
    this.removedCapacity = this.helper.updateCapacity(
      this.fileteredCapacityValues.filter((values) => values.isDeleted),
      regionCapacity,
      false
    );
  }

  setOverAllResourceCapacity(sgId: string) {
    if (!this.overAllResourceCapacities.find((val) => val.sgId === sgId)) {
      this.dashboardService
        .getresourceCapacityBySgId({
          year: '2021',
          sgId,
          totalQuantity: true,
        })
        .subscribe((capacity: Dashboard[]) => {
          if (capacity.length > 0) {
            this.overAllResourceCapacities.push(capacity[0]);
            this.overAllResourceCapacity = capacity[0];
          } else {
            this.initializeOverAllResourceCapcityValues();
          }
        });
    } else {
      this.overAllResourceCapacity = this.overAllResourceCapacities.find(
        (val) => val.sgId === sgId
      );
    }
  }

  recalculateOverAllCapacity(sgId: string, month: number) {
    let totalResourceCapacityPerMonth = 0;

    this.fileteredCapacityValues
      .filter((val) => val.sgId === sgId)
      .map((element) => {
        totalResourceCapacityPerMonth += parseInt(
          element.capacities[month].capacity,
          0
        );
      });
    if (isNaN(totalResourceCapacityPerMonth)) {
      totalResourceCapacityPerMonth = 0;
    }
    this.overAllResourceCapacities.find(
      (item) => item.sgId === sgId
    ).capacities[month].capacity = totalResourceCapacityPerMonth.toString();

    this.overAllResourceCapacity.capacities[
      month
    ].capacity = totalResourceCapacityPerMonth.toString();
  }
  //#endregion Helper Methods
}
