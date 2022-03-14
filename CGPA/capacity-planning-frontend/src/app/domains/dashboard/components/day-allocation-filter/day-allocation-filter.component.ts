//#region Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';
//#endregion Imports

//#region Internal Imports
import { DashboardComponent } from '../../common/dashboard.component';
import { BusinessUnit } from 'src/app/core/model/business-unit/entities/_module';
import { Team } from 'src/app/core/model/team/entities/_module';
import { Project } from 'src/app/core/model/project/entities/_module';
import {
  Resource,
  ResourceRole,
} from 'src/app/core/model/resource/entities/_module';
import { DayAllocationFilter } from '../../parameters/_module';
//#endregion Internal Imports

@Component({
  selector: 'das-day-allocation-filter',
  templateUrl: './day-allocation-filter.component.html',
  styleUrls: ['./day-allocation-filter.component.scss'],
})
export class DayAllocationFilterComponent extends DashboardComponent {
  //#region Variable Declarations
  @Input() businessUnits: BusinessUnit[];
  @Input() projects: Project[];
  @Input() resourceRoles: ResourceRole[];
  @Input() resources: Resource[];
  @Input() teams: Team[];
  @Output()
  filter: EventEmitter<DayAllocationFilter> = new EventEmitter<DayAllocationFilter>();
  @Output() reset: EventEmitter<boolean> = new EventEmitter<boolean>();

  filteredProjects: Project[];
  filteredResourceRoles: ResourceRole[];
  filteredResources: Resource[];
  //#endregion Variable Declarations

  //#region Constructor
  constructor() {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {}

  ngOnChanges() {
    this.mapProjects();
    this.mapResourceRole();
    this.mapResource();
  }
  //#endregion Initialization Method

  //#region Action Methods
  search(form: any) {
    this.filter.emit({
      year: '2021',
      businessUnitId: form.buSearchField === null ? '' : form.buSearchField,
      projectId:
        form.projectSearchField === null ? '' : form.projectSearchField,
      roleId: form.roleSearchField === null ? '' : form.roleSearchField,
      resourceId:
        form.resourceSearchField === null ? '' : form.resourceSearchField,
      teamId: form.teamSearchField === null ? '' : form.teamSearchField,
    });
  }
  resetFilter(form: any) {
    this.reset.emit(true);
  }
  //#endregion Action Methods

  //#region Events
  onBusinessUnitChange(data: any) {
    console.log(data);
    this.mapProjects();
    if (data.value) {
      this.filteredProjects = this.filteredProjects.filter(
        (project) => project.businessUnit.id === data.value
      );
    }
  }

  onTeamChange(data: any) {
    this.mapResourceRole();
    this.mapResource();
    const roles = [];

    if (data.teamSearchField) {
      this.filteredResources
        .filter((resource) => resource.team.id === data.teamSearchField)
        .map((resource) => {
          resource.roles.map((role) => {
            roles.push(role);
          });
        });
      this.filteredResourceRoles = _.uniqBy(roles, 'id');

      this.filteredResources = this.filteredResources.filter(
        (item) => item.team.id === data.teamSearchField
      );
    }
    if (data.roleSearchField) {
      this.filteredResources = _.filter(this.filteredResources, {
        roles: [{ id: data.roleSearchField }],
      });
    }
  }

  onResourceRoleChange(data: any) {
    this.mapResource();
    if (data.roleSearchField) {
      this.filteredResources = _.filter(this.filteredResources, {
        roles: [{ id: data.roleSearchField }],
      });
    }
  }
  //#endregion Events

  //#region DropdownMapping
  mapProjects() {
    this.filteredProjects = [];
    if (this.projects) {
      this.projects.map((item) => this.filteredProjects.push(item));
    }
  }

  mapResourceRole() {
    this.filteredResourceRoles = [];
    if (this.resourceRoles) {
      this.resourceRoles.map((item) => this.filteredResourceRoles.push(item));
    }
  }

  mapResource() {
    this.filteredResources = [];
    if (this.resources) {
      this.resources.map((item) => this.filteredResources.push(item));
    }
  }
  //#endregion DropdownMapping
}
