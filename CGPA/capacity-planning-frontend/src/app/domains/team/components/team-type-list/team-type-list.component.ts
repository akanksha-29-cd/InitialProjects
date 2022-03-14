//#region Imports
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

//#endregion Imports


//#region Internal Imports
import { TeamComponent } from '../../common/team.component';
import {
  Team
} from '../../../../core/model/team/entities/_module';
import { TeamTypeService } from '../../services/team-type.service';
//#endregion Internal Imports

@Component({
    selector: 'tea-team-type-list',
    templateUrl: './team-type-list.component.html',
    styleUrls: ['./team-type-list.component.scss'],
  })
  export class TeamTypeListComponent extends TeamComponent {
  //#region Variable Declarations
  teamTypeDialogue = false;
  formTitle: string = 'Add Team';
  team: Team;
  subject = new Subject();
  teams$: Observable<Team[]>;
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(
    private teamTypeService: TeamTypeService
  ) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {
    this.teams$ = this.subject.asObservable().pipe(
      startWith(0),
      switchMap(() => this.teamTypeService.getTeamType())
    );
  }

  //#endregion Initialization Method
  //#region Action Methods

  openDialogue() {
    this.team = {
      id: '',
      name: '',
      active: true
    };
    this.teamTypeDialogue = true;
    this.formTitle = 'Add Team';
  }
  //#endregion Action Methods
  //#region  Events
  onTeamTypeDialogue(toggleDialogue: boolean) {
    this.teamTypeDialogue = toggleDialogue;
  }

onsuccessOperation(isSuceess: boolean) {
  if (isSuceess) {
    this.subject.next();
  }
}

deleteTeam(value: Team) {
  this.teamTypeService
    .updateTeamType({
      id: value.id,
      name: value.name,
      active: false,
    })
    .subscribe(() => {
      this.subject.next();
      this.toasterService.success('Team Deleted sucessfully', 'Success');
    });
}
editTeam(team: Team) {
  this.team = team;
  this.teamTypeDialogue = true;
  this.formTitle = 'Edit Team';
}
//#endregion Events
}