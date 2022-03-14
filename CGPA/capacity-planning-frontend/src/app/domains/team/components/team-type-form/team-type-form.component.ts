//#region Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
//#endregion Imports

//#region Internal Imports
import { TeamComponent } from '../../common/team.component';
import { Team } from '../../../../core/model/team/entities/_module';
import {
  AddTeamTypeParameter,
  UpdateTeamTypeParameter,
} from '../../parameters/_module';
import { TeamTypeService } from '../../services/team-type.service';
//#endregion Internal Imports

@Component({
    selector: 'tea-team-type-form',
    templateUrl: './team-type-form.component.html',
    styleUrls: ['./team-type-form.component.scss'],
  })
  export class TeamTypeFormComponent extends TeamComponent {
  //#region Variable Declarations
  @Input() teamTypeDialogue: boolean;
  @Input() teams: Team[];
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() formTitle: string;
  teamVal: Team;
    
  get team(): Team {
    return this.teamVal;
  }
  @Input() set team(value: Team) {
    this.teamVal = value;
  }

    //#region  Constructor
    constructor(private service: TeamTypeService) {
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
      this.teamTypeDialogue = false;
      this.diaologue.emit(this.teamTypeDialogue);
    }
    saveTeam(formValues: any) {
      if (this.team.id) {
        this.updateteam(formValues);
      } else {
        this.addNewTeam(formValues);
      }
      this.hideDialogue();
    }
    addNewTeam(formValues: any) {
      const parameter: AddTeamTypeParameter = {
        name: formValues.teamName,
        active: true,
      };
      this.service.saveTeamType(parameter).subscribe(() => {
        this.toasterService.success('Service Saved sucessfully', 'Success');
        this.successOperation.emit(true);
        this.hideDialogue();
      });
    }
    updateteam(formValues: any) {
      const parameter: UpdateTeamTypeParameter = {
        id: this.team.id,
        name: formValues.teamName,
        active: true,
      };
      this.service.updateTeamType(parameter).subscribe(() => {
        this.toasterService.success('Service Saved sucessfully', 'Success');
        this.successOperation.emit(true);
        this.hideDialogue();
      });
    }
    //#endregion Action Methods
  }