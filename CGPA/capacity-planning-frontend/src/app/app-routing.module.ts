//#region Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//#endregion Imports

//#region InternalImports
import { DefaultLayoutComponent } from './core/layout/_module';
import { AuthGuardService } from './domains/authentication/services/authGuard.service';
import { AuthCallbackComponent, SignoutCallbackComponent } from './domains/authentication/_module';
import {
  DayAllocationComponent,
  DayAllocationReportComponent,
} from './domains/dashboard/_module';
import { ProjectListComponent } from './domains/project/_module';
import { RegionListComponent } from './domains/region/_module';
import { ResourceListComponent } from './domains/resource/components/resource-list/resource-list.component';
import { TeamTypeListComponent } from './domains/team/components/team-type-list/team-type-list.component';
import { RoleListComponent } from './domains/role/_module';
import { ProjectTypeListComponent } from './domains/projectType/_module';
import { TeamListComponent } from './domains/team/_module';

//#endregion InternalImports

const routes: Routes = [
  // {
  //   path: 'auth-callback',
  //   component: AuthCallbackComponent,
  // },
  // {
  //   path: 'signout-callback',
  //   component: SignoutCallbackComponent,
  // },
  { path: '', redirectTo: 'dashboard/report', pathMatch: 'full' },
  {
    path: '',
    // canActivate: [AuthGuardService],
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard/report',
        component: DayAllocationReportComponent,
      },
      {
        path: 'dashboard/allocate',
        component: DayAllocationComponent,
      },
      {
        path: 'resource/list',
        component: ResourceListComponent,
      },
      {
        path: 'project/list',
        component: ProjectListComponent,
      },
      {
        path: 'team-type/list',
        component: TeamTypeListComponent,
      },
      {
        path: 'role/list',
        component: RoleListComponent,
      },
      {
        path: 'team/list',
        component: TeamListComponent,
      },
      {
        path: 'projectType/list',
        component: ProjectTypeListComponent,
      },
      {
        component: RegionListComponent,
        path: 'region/list',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
