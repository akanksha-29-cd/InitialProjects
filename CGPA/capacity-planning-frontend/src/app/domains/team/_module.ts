export * from "./components/team-form/team-form.component";
export * from "./components/team-list/team-list.component";
export * from './components/team-type-form/team-type-form.component';
export * from './components/team-type-list/team-type-list.component';
//#endregion Exports All Module
import { TeamFormComponent } from "./components/team-form/team-form.component";
import { TeamListComponent } from "./components/team-list/team-list.component";
//#region Internal Imports
import { TeamTypeFormComponent } from './components/team-type-form/team-type-form.component';
import { TeamTypeListComponent } from './components/team-type-list/team-type-list.component';
//#endregion Internal Imports

export const TeamComponents: any[] = [
    TeamTypeFormComponent,
    TeamTypeListComponent,
    TeamFormComponent,
    TeamListComponent
];
