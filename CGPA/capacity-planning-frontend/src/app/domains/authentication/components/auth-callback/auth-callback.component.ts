//#region imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/core/model/authentication/userProfile.model';
import { AuthComponent } from '../../common/auth.component';
import { AppDataService } from '../../services/appData.service';
import { AuthService } from '../../services/auth.service';
//#endregion imports
@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent extends AuthComponent {
  private sub$: Subscription = new Subscription();
  isLoading = false;

  constructor(
    private authService: AuthService,
    private appDataService: AppDataService,
    private router: Router
  ) {
    super();
  }

  viewInit(): void {
    this.authService.completeLogin().then((user) => {
      if (user && !user.expired) {
        const userProfile: UserProfile = new UserProfile();
        userProfile.sgid = user.profile.sub;
        userProfile.firstName = user.profile.given_name;
        userProfile.lastName = user.profile.family_name;
        userProfile.email = user.profile.email;
        this.appDataService.connectedUser = userProfile;
        this.router.navigateByUrl('dashboard/report');

      }
    });
  }

}
