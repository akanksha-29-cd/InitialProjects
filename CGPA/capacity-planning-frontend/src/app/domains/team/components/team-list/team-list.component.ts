
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { Team } from 'src/app/core/model/team/entities/_module';
import { TeamComponent } from '../../common/team.component';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent extends TeamComponent {
  teams$: Observable<Team[]>;
  subject = new Subject();
  formTitle: string;
  teamDialogue = false;
  team: Team;


  constructor(private service: TeamService) {
    super();
   }

//#region Initialization Method
viewInit() {
  this.initialize();
}

initialize() {
  this.teams$ = this.subject.asObservable().pipe(
    startWith(0),
    switchMap(() => this.service.getTeams())
  );
}

//#endregion Initialization Method

//#region Action Methods
openDialogue() {
  this.team = {
    id: '',
    name: '',
    active:true
  };
  this.teamDialogue = true;
  this.formTitle = 'Add Team';
}

deleteTeam(id: string) {
  this.service.deleteTeam({ id }).subscribe(() => {
    this.subject.next();
    this.toasterService.success('Team Deleted sucessfully', 'Success');
  });
}

updateTeam(team :Team) {
team.active=false;
  this.service.updateTeam(team).subscribe(() => {
    this.toasterService.success('Team Deleted sucessfully', 'Success');

  });
}

editTeam(project: Team) {
  this.team = {...project};
  this.formTitle = 'Update Team';
  this.teamDialogue = true;
}
//#endregion Action Methods

//#region  Events
onTeamDialogue(toggleDialogue: boolean) {
  this.teamDialogue = toggleDialogue;
}

onsuccessOperation(isSuceess: boolean) {
  if (isSuceess) {
    this.subject.next();
  }
}
//#endregion Events
}
