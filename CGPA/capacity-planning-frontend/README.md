# CapacityPlanning

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Manual Steps to deploy in Azure

1. Open bash or powersehll -> az login -> a browser popup will oepn where you will need to insert your azure credentials
2. ng build --prod -> from your project folder
3. az storage blob upload-batch -d '$web' --account-name stidsgcpadev001 -s ./dist/capacity-planning/
4. Browse https://storageaccountcapacafb3.z19.web.core.windows.net/

**(No longer used - Azure App service for hosting Angular Web App)**

~~3. cd dist\capacity-planning~~

~~4. az webapp up --location centralus --name capacityplanningids-webapp --html~~

~~5. Browse https://capacityplanningids-webapp.azurewebsites.net/~~


## Gitlab CI Example
Please refer to https://gitlab.com/chrisedrego/tym_mchyn/-/blob/master/.gitlab-ci.yml
