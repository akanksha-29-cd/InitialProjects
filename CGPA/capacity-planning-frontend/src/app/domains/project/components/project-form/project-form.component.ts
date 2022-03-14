//#region Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
//#endregion Imports

//#region Internal Imports
import { ProjectComponent } from '../../common/project.component';
import { ProjectType } from 'src/app/core/model/project/constants/project-type.constant';
import { ProjectService } from '../../services/project.service';
import {
  AddProjectParameter,
  UpdateProjectParameter,
} from '../../parameters/_module';
import { BusinessUnit } from 'src/app/core/model/business-unit/entities/_module';
import { BusinessUnitService } from 'src/app/core/services/business-unit.service';
import { Project } from 'src/app/core/model/project/entities/_module';
//#endregion Internal Imports

@Component({
  selector: 'pro-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent extends ProjectComponent {
  //#region Variable Declarations
  @Input() projectDialogue: boolean;
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() project: Project;
  businessUnits: BusinessUnit[] = [];
  projectTypes = ProjectType;
  @Input() formTitle: string;
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(
    private service: ProjectService,
    private buSerive: BusinessUnitService
  ) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  initialize() {
    this.buSerive.getBusinessUnits().subscribe((res) => {
      res.forEach((e: BusinessUnit) => {
        this.businessUnits.push(e);
      });
      return this.businessUnits;
    });
  }
  //#endregion Initialization Method

  //#region Action Methods
  hideDialogue() {
    this.projectDialogue = false;
    this.diaologue.emit(this.projectDialogue);
  }

  saveProject(formValues: any, projectTypes: any, businessUnits: any) {
    if (this.project.id) {
      this.updateProject(formValues, projectTypes, businessUnits);
    } else {
      this.addNewProject(formValues, projectTypes, businessUnits);
    }
    this.hideDialogue();
  }
  //#endregion Action Methods

  //#region Helper Methods
  addNewProject(formValues: any, projectTypes: any, businessUnits: any) {
    const parameter: AddProjectParameter = {
      name: formValues.projectName,
      businessUnit: {
        id: formValues.bu,
        name: businessUnits.find((bu) => bu.id === formValues.bu).name,
      },
      type: {
        id: formValues.projectType,
        name: projectTypes.find(
          (projectType) => projectType.id === formValues.projectType
        ).name,
      },
      otp: formValues.otp,
    };
    this.service.saveProject(parameter).subscribe((saveSuccess) => {
      this.toasterService.success('Project Saved sucessfully', 'Success');
      this.successOperation.emit(true);
    });
  }

  updateProject(formValues: any, projectTypes: any, businessUnits: any) {
    const parameter: UpdateProjectParameter = {
      id: this.project.id,
      name: formValues.projectName,
      businessUnit: {
        id: formValues.bu,
        name: businessUnits.find((bu) => bu.id === formValues.bu).name,
      },
      type: {
        id: formValues.projectType,
        name: projectTypes.find(
          (projectType) => projectType.id === formValues.projectType
        ).name,
      },
      otp: formValues.otp,
    };
    this.service.updateProject(parameter).subscribe((saveSuccess) => {
      this.toasterService.success('Project Updated sucessfully', 'Success');
      this.successOperation.emit(true);
    });
  }
  //#endregion Helper Methods
}
