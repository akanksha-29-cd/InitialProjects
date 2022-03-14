//#region Imports
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
//#endregion Imports

//#region Internal Imports
import { ProjectComponent } from '../../common/project.component';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/core/model/project/entities/_module';
//#endregion Internal Imports
@Component({
  selector: 'pro-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent extends ProjectComponent {
  //#region Variable Declarations
  projectDialogue = false;
  projects$: Observable<Project[]>;
  subject = new Subject();
  project: Project;
  formTitle: string;
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(private service: ProjectService) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {
    this.projects$ = this.subject.asObservable().pipe(
      startWith(0),
      switchMap(() => this.service.getprojects())
    );
  }

  //#endregion Initialization Method

  //#region Action Methods
  openDialogue() {
    this.project = {
      id: '',
      businessUnit: { id: '', name: '' },
      type: { id: null, name: '' },
      name: '',
      otp: '',
    };
    this.projectDialogue = true;
    this.formTitle = 'Add Project';
  }

  deleteProject(id: string) {
    this.service.deleteProject({ id }).subscribe(() => {
      this.subject.next();
      this.toasterService.success('Project Deleted sucessfully', 'Success');
    });
  }

  editProject(project: Project) {
    this.project = project;
    this.formTitle = 'Update Project';
    this.projectDialogue = true;
  }
  //#endregion Action Methods

  //#region  Events
  onProjectDialogue(toggleDialogue: boolean) {
    this.projectDialogue = toggleDialogue;
  }

  onsuccessOperation(isSuceess: boolean) {
    if (isSuceess) {
      this.subject.next();
    }
  }
  //#endregion Events
}
