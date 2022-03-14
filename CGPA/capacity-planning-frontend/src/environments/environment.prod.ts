export const environment = {
  production: true,
  apiUrl: 'https://dev-capacityplanning-api.saint-gobain.com/test/',
  apiSubsKey: '4ad40837abe44997897e19e635a08217',
  authority: 'https://uat.cloudgateway.saint-gobain.com/openam/oauth2/',
  clientId: 'POC_Global_Capacity_Planning',
  clientSecret: 'Dy2QOnHaTjtOMAA1PV7I',
  redirectUri: 'https://dev-capacityplanning.saint-gobain.com/',
  postLogoutRedirectUri: 'https://dev-capacityplanning.saint-gobain.com/',
  authorizationEndpoint:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/authorize',
  issuer:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/realms/root/realms/AccessManagement',
  tokenEndpoint: 'https://dev-capacityplanning-api.saint-gobain.com/test-sso/access_token',
  endSessionEndpoint:
    'https://cloudsso.saint-gobain.com/openam/XUI/?realm=/AccessManagement#logout/',
  userInfoEndpoint: 'https://dev-capacityplanning-api.saint-gobain.com/test-sso/user_info',
  jwksUri:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/connect/jwk_uri',
  introspectionEndpoint:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/introspect',
  checkSessionIframe:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/connect/checkSession',
  registrationEndpoint:
    'https://uat.cloudgateway.saint-gobain.com:443/openam/oauth2/register'
};
 
