//#region Internal Imports
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component';
//#endregion Internal Imports

export const AuthenticationComponents: any[] = [
  AuthCallbackComponent,
  SignoutCallbackComponent
];

//#region Exports All Module
export * from './components/auth-callback/auth-callback.component';
export * from './components/signout-callback/signout-callback.component';
//#endregion Exports All Module
