import { Component, EventEmitter, OnInit, Output ,Input} from '@angular/core';
import { Team } from 'src/app/core/model/team/entities/team.entity';
import { TeamService } from '../../services/team.service';
import { TeamComponent } from '../../common/team.component';


@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent extends TeamComponent {

   //#region Variable Declarations
   @Input() teamDialogue: boolean;
   @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output()
   successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Input() team: Team;
   @Input() formTitle: string;
   //#endregion Variable Declarations

   //#region  Constructor
   constructor(
     private service: TeamService

   ) {
     super();
   }
   //#endregion Constructor

   //#region Initialization Method
   viewInit() {

   }

 //#region Action Methods
 hideDialogue() {
  this.teamDialogue = false;
  this.diaologue.emit(this.teamDialogue);
}

saveTeam(formValues: any) {
  if (this.team.id) {
    this.updateTeam(formValues);
  } else {
    this.addNewTeam(formValues);
  }
  this.hideDialogue();
}

addNewTeam(formValues: any) {
  const parameter: any = {
    name: formValues.teamName,
    active: true,
  };
  this.service.saveTeam(parameter).subscribe(() => {
    this.toasterService.success('Team Saved sucessfully', 'Success');
    this.successOperation.emit(true);
    this.hideDialogue();
  });
}

updateTeam(formValues: any) {
  const parameter: Team = {
    id: this.team.id,
    name: formValues.teamName,
    active: this.team.active,
  };
  this.service.updateTeam(parameter).subscribe(() => {
    this.toasterService.success('Team Saved sucessfully', 'Success');
    this.successOperation.emit(true);
    this.hideDialogue();
  });
}
//#endregion Action Methods



}
