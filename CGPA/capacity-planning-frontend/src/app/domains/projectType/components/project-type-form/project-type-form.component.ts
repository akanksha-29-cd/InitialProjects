import { Component, EventEmitter, OnInit, Output ,Input} from '@angular/core';
import { ProjectType } from 'src/app/core/model/project/entities/project-type.entity';
import { ProjectTypeComponent } from '../../common/projectType.component';
import { ProjectTypeService } from '../../services/projectType.service';

@Component({
  selector: 'app-project-type-form',
  templateUrl: './project-type-form.component.html',
  styleUrls: ['./project-type-form.component.scss']
})
export class ProjectTypeFormComponent extends ProjectTypeComponent {

  //#region Variable Declarations
  @Input() projectTypeDialogue: boolean;
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() projectType: ProjectType;
  @Input() formTitle: string;
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(
    private service: ProjectTypeService

  ) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {

  }

//#region Action Methods
hideDialogue() {
 this.projectTypeDialogue = false;
 this.diaologue.emit(this.projectTypeDialogue);
}

saveProjectType(formValues: any) {
 if (this.projectType.id) {
   this.update(formValues);
 } else {
   this.addNew(formValues);
 }
 this.hideDialogue();
}

addNew(formValues: any) {
 const parameter: any = {
   name: formValues.name,
   active: true,
 };
 this.service.saveProjectType(parameter).subscribe(() => {
   this.toasterService.success('Project Type Saved sucessfully', 'Success');
   this.successOperation.emit(true);
   this.hideDialogue();
 });
}

update(formValues: any) {
 const parameter: ProjectType = {
   id: this.projectType.id,
   name: formValues.name,
   active: this.projectType.active,
 };
 this.service.updateProjectType(parameter).subscribe(() => {
   this.toasterService.success('Project Type Saved sucessfully', 'Success');
   this.successOperation.emit(true);
   this.hideDialogue();
 });
}
//#endregion Action Methods



}
