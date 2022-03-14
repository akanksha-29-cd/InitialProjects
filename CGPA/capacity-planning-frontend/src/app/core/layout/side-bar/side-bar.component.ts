import { Component, OnInit } from '@angular/core';
//#region imports
import { AppDataService } from 'src/app/domains/authentication/services/appData.service';
import { UserProfile } from '../../model/authentication/userProfile.model';
//#endregion imports
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  userprofile: UserProfile;
  constructor(private appDataService: AppDataService) { }

  ngOnInit(): void {
    this.userprofile =  this.appDataService.connectedUser;
  }
}
