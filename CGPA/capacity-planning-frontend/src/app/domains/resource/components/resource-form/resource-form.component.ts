//#region Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
//#endregion Imports

//#region Internal Imports
import { ResourceComponent } from '../../common/resource.component';
import { TeamType } from 'src/app/core/model/team/constants/team-type.constant';
import { Team } from 'src/app/core/model/team/entities/_module';
import {
  Resource,
  ResourceRole,
} from 'src/app/core/model/resource/entities/_module';
import {
  AddResourceParameter,
  UpdateResourceParameter,
} from '../../parameters/_module';
import { ResourceService } from '../../services/resource.service';
//#endregion Internal Imports
@Component({
  selector: 'res-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss'],
})
export class ResourceFormComponent extends ResourceComponent {
  //#region Variable Declarations
  @Input() userDialogue: boolean;
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() resourceRoles: ResourceRole[];
  @Input() teams: Team[];
  resourceVal: Resource;
  selectedRoles: string[] = [];
  @Input() formTitle: string;
  get resource(): Resource {
    return this.resourceVal;
  }
  @Input() set resource(value: Resource) {
    this.resourceVal = value;
    if (value?.roles[0].id) {
      this.selectedRoles = value.roles.map((role) => role.id);
    }
  }
  teamTypes = TeamType;

  //#endregion Variable Declarations

  //#region  Constructor
  constructor(private service: ResourceService) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {}

  //#endregion Initialization Method

  //#region Action Methods
  hideDialogue() {
    this.userDialogue = false;
    this.diaologue.emit(this.userDialogue);
    this.selectedRoles = [];
  }

  saveResource(formValues: any) {
    if (this.resource.id) {
      this.updateresource(formValues);
    } else {
      this.addNewResource(formValues);
    }
    this.hideDialogue();
  }

  addNewResource(formValues: any) {
    const roles: ResourceRole[] = [];
    formValues.roles.forEach((element) => {
      const data = this.resourceRoles.find((role) => role.id === element);
      roles.push(data);
    });
    const parameter: AddResourceParameter = {
      sgId: formValues.resourceId,
      name: formValues.resourceName,
      roles,
      team: {
        id: formValues.team,
        name: this.teams.find((team) => team.id === formValues.team).name,
      },
      teamType: {
        id: formValues.teamType,
        name: this.teamTypes.find(
          (teamType) => teamType.id === formValues.teamType
        ).name,
      },
      active: true,
    };
    this.service.saveResource(parameter).subscribe(() => {
      this.toasterService.success('Service Saved sucessfully', 'Success');
      this.successOperation.emit(true);
      this.hideDialogue();
    });
  }

  updateresource(formValues: any) {
    const roles: ResourceRole[] = [];
    formValues.roles.forEach((element) => {
      const data = this.resourceRoles.find((role) => role.id === element);
      roles.push(data);
    });
    const parameter: UpdateResourceParameter = {
      id: this.resource.id,
      sgId: formValues.resourceId,
      name: formValues.resourceName,
      roles,
      team: {
        id: formValues.team,
        name: this.teams.find((team) => team.id === formValues.team).name,
      },
      teamType: {
        id: formValues.teamType,
        name: this.teamTypes.find(
          (teamType) => teamType.id === formValues.teamType
        ).name,
      },
      active: true,
    };
    this.service.updateResource(parameter).subscribe(() => {
      this.toasterService.success('Service Saved sucessfully', 'Success');
      this.successOperation.emit(true);
      this.hideDialogue();
    });
  }
  //#endregion Action Methods

  //#region  Events

  //#endregion Events
}
