//#region Imports
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
//#endregion Imports
import {
  Team,
  TeamTypeContext,
} from 'src/app/core/model/team/entities/_module';
import { ResourceComponent } from '../../common/resource.component';
import { ResourceService } from '../../services/resource.service';
import {
  Resource,
  ResourceRole,
} from 'src/app/core/model/resource/entities/_module';
import { ResourceRoleService } from 'src/app/core/services/resource-roles.service';
import { TeamService } from 'src/app/core/services/team.service';
//#region Internal Imports

//#endregion Internal Imports

@Component({
  selector: 'res-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent extends ResourceComponent {
  //#region Variable Declarations
  userDialogue = false;
  roles$: Observable<ResourceRole[]>;
  teams$: Observable<Team[]>;
  resource$: Observable<Resource[]>;
  subject = new Subject();
  resource: Resource;
  formTitle: string = 'Add User';
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(
    private resourceService: ResourceService,
    private resourceRoleService: ResourceRoleService,
    private teamService: TeamService
  ) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {
    this.teams$ = this.teamService.getTeams();
    this.roles$ = this.resourceRoleService.getResourceRoles();
    this.resource$ = this.subject.asObservable().pipe(
      startWith(0),
      switchMap(() => this.resourceService.getResources())
    );
  }

  //#endregion Initialization Method

  //#region Action Methods

  openDialogue() {
    this.resource = {
      id: '',
      sgId: '',
      name: '',
      roles: [{ id: '', name: '' }],
      team: { id: '', name: '', active: true },
      teamType: { id: '', name: '' },
      active: true,
    };
    this.userDialogue = true;
    this.formTitle = 'Add User';
  }
  //#endregion Action Methods

  //#region  Events
  onUserDialogue(toggleDialogue: boolean) {
    this.userDialogue = toggleDialogue;
  }
  onsuccessOperation(isSuceess: boolean) {
    if (isSuceess) {
      this.subject.next();
    }
  }

  deleteResouce(value: Resource) {
    this.resourceService
      .updateResource({
        id: value.id,
        sgId: value.sgId,
        name: value.name,
        roles: value.roles,
        team: value.team,
        teamType: value.teamType,
        active: false,
      })
      .subscribe(() => {
        this.subject.next();
        this.toasterService.success('Resource Deleted sucessfully', 'Success');
      });
  }
  editResource(resource: Resource) {
    this.resource = resource;
    this.userDialogue = true;
    this.formTitle = 'Edit user';
  }
  //#endregion Events
}
