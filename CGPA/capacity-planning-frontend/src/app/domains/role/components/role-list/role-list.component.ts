//#region Imports
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Role } from 'src/app/core/model/roles/entities/_module';
//#endregion Imports

import { RoleComponent } from '../../common/role.component';
import { RoleService } from '../../services/role.service';
@Component({
    selector: 'res-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
  })
  export class RoleListComponent extends RoleComponent {
    //#region Variable Declarations
    userDialogue = false;    
    role$: Observable<Role[]>;
    subject = new Subject();
    role: Role;
    formTitle: string = 'Add Role';
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
        this.role$ = this.subject.asObservable().pipe(
          startWith(0),
          switchMap(() => this.roleService.getRoles())
        );
    }
    //#endregion Initialization Method

    //#region Action Methods

  openDialogue() {
    this.role = {
      id: '',      
      name: '',
      code: '',
      organization: { id: null, name: ''},
      gaspard: '',
      active: true,
    };
    this.userDialogue = true;
    this.formTitle = 'Add Role';
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

  deleteRole(value: Role) {
    this.roleService
      .updateRole({
        id: value.id,        
        name: value.name,
        code: value.code,
        organization: value.organization,
        gaspard: value.gaspard,
        active: false,
      })
      .subscribe(() => {
        this.subject.next();
        this.toasterService.success('Role Deleted sucessfully', 'Success');
      });
  }
  editRole(role: Role) {
    this.role = role;
    this.userDialogue = true;
    this.formTitle = 'Edit Role';
  }
  //#endregion Events
  }