//#region Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role, OrganizationContext } from 'src/app/core/model/roles/entities/_module';
import { Organization } from 'src/app/core/model/roles/constants/organizations.constant';
//#endregion Imports

//#region Internal Imports
import { RoleComponent } from '../../common/role.component';
import { AddRoleParameter, UpdateRoleParameter } from '../../parameters/_module';
import { RoleService } from '../../services/role.service';
@Component({
    selector: 'res-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss'],
  })
  export class RoleFormComponent extends RoleComponent {
    //#region Variable Declarations
  @Input() userDialogue: boolean;
  @Output() diaologue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successOperation: EventEmitter<boolean> = new EventEmitter<boolean>();
  roleVal: Role;  
  roleOrgs = Organization;  
  @Input() formTitle: string;
  get role(): Role {
    return this.roleVal;
  }
  @Input() set role(value: Role) {
    this.roleVal = value;
  }
  //#endregion Variable Declarations

  //#region  Constructor
  constructor(private roleService: RoleService) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
      this.initialize();  
    }
  initialize() {
    
  }
  //#endregion Initialization Method

  //#region Action Methods
  hideDialogue() {
    this.userDialogue = false;
    this.diaologue.emit(this.userDialogue); 
  }

  saveRole(formValues: any) {
    if (this.role.id) {
      this.updateRole(formValues);
    } else {
      this.addNewRole(formValues);
    }
    this.hideDialogue();
  }

  addNewRole(formValues: any) {
    const parameter: AddRoleParameter = {      
      name: formValues.name,
      code: formValues.code,
      //organization: formValues.organization,
      organization: {
        id: formValues.organization,
        name: this.roleOrgs.find((org) => org.id === formValues.organization).name,
      },
      gaspard: formValues.gaspard,
      active: true,
    };
    this.roleService.saveRole(parameter).subscribe(() => {
      this.toasterService.success('Role saved sucessfully', 'Success');
      this.successOperation.emit(true);
      this.hideDialogue();
    });
  }

  updateRole(formValues: any) {   
    const parameter: UpdateRoleParameter = {
      id: this.role.id,      
      name: formValues.name,
      code: formValues.code,
      //organization: formValues.organization,
      organization: {
        id: formValues.organization,
        name: this.roleOrgs.find((org) => org.id === formValues.organization).name,
      },
      gaspard: formValues.gaspard,      
      active: true,
    };
    this.roleService.updateRole(parameter).subscribe(() => {
      this.toasterService.success('Role updated sucessfully', 'Success');
      this.successOperation.emit(true);
      this.hideDialogue();
    });
  }
  //#endregion Action Methods

  //#region  Events

  //#endregion Events
  }