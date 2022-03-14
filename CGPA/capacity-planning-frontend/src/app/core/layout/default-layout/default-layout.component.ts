import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  //#region Variable Declaration
  isSidebarButtonToggled = false;
  //#endregion Variable Declaration

  //#region Constructor
  constructor() {}

  //#endregion Constructor

  //#region After Initialization Method
  ngAfterViewInit() {
    const content = document.getElementById('content');
    content.classList.add('sidebar-content-margin');
  }
  //#endregion After Initialization Method

  //#region Action Methods
  toggleSideBar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    if (!this.isSidebarButtonToggled) {
      sidebar.classList.add('active-sidebar');
      content.classList.remove('sidebar-content-margin');
      this.isSidebarButtonToggled = true;
    } else {
      sidebar.classList.remove('active-sidebar');
      content.classList.add('sidebar-content-margin');
      this.isSidebarButtonToggled = false;
    }
  }
  //#endregion Action Methods
}
