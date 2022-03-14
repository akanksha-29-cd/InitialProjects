//#region Internal Imports
import { SideBarComponent } from './side-bar/side-bar.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
//#endregion Internal Imports

export const LayoutComponents: any[] = [
  DefaultLayoutComponent,
  SideBarComponent,
];

//#region Exports All Module
export * from './side-bar/side-bar.component';
export * from './default-layout/default-layout.component';
//#endregion Exports All Module
