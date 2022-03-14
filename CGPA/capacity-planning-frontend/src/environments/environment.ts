// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://dev-capacityplanning-api.saint-gobain.com/test/',
  apiSubsKey: '4ad40837abe44997897e19e635a08217',
  authority: 'https://uat.cloudgateway.saint-gobain.com/openam/oauth2/',
  clientId: 'DEV_ANGULAR',
  clientSecret: 'S4xX2GeZgCwVLbL7',
  redirectUri: 'http://localhost:4200/',
  postLogoutRedirectUri: 'http://localhost:4200/',
  authorizationEndpoint:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/authorize',
  issuer:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/realms/root/realms/AccessManagement',
  tokenEndpoint: 'http://localhost:7071/api/access_token',
  endSessionEndpoint:
    'https://cloudsso.saint-gobain.com/openam/XUI/?realm=/AccessManagement#logout/',
  userInfoEndpoint: 'http://localhost:7071/api/user_info',
  jwksUri:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/connect/jwk_uri',
  introspectionEndpoint:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/introspect',
  checkSessionIframe:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/connect/checkSession',
  registrationEndpoint:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/register'
};
 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
