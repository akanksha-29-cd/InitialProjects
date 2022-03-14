import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ProjectTypeComponent } from '../../common/projectType.component';
import { ProjectTypeService } from '../../services/projectType.service';
import { ProjectType } from 'src/app/core/model/project/entities/project-type.entity';

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss']
})
export class ProjectTypeListComponent extends ProjectTypeComponent {

  projectTypes$: Observable<ProjectType[]>;
  subject = new Subject();
  formTitle: string;
  projectTypeDialogue = false;
  projectType: ProjectType;

  constructor(private service: ProjectTypeService) {
    super();
   }

//#region Initialization Method
viewInit() {
  this.initialize();
}

initialize() {
  this.projectTypes$ = this.subject.asObservable().pipe(
    startWith(0),
    switchMap(() => this.service.getProjectTypes())
  );
}

//#region Action Methods
openDialogue() {
  this.projectType = {
    id: '',
    name: '',
    active:true
  };
  this.projectTypeDialogue = true;
  this.formTitle = 'Add Project Type';
}



updateProjectType(project :ProjectType) {
  project.active=false;
  this.service.updateProjectType(project).subscribe(() => {
    this.toasterService.success('Project Type Deleted sucessfully', 'Success');
  });
}

editProjectType(project: ProjectType) {
  this.projectType={...project};
  this.formTitle = 'Update Project Type';
  this.projectTypeDialogue = true;
}
//#endregion Action Methods

//#region  Events
onProjectTypeDialogue(toggleDialogue: boolean) {
  this.projectTypeDialogue = toggleDialogue;
}

onsuccessOperation(isSuceess: boolean) {
  if (isSuceess) {
    this.subject.next();
  }
}
//#endregion Events


}
