# ng-firebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Initial setup
Replace `project-slug` and `firebase-project-slug` in the following command with your own values
* Run `make initial-setup project=project-slug firebase=firebase-project-slug`
#### OR
* Search and replace all instances of `NG_PROJECT` with your project name as a slug e.g. `ng-firebase`
* Search and replace all instances of `FIREBASE_PROJECT_ID` with your firebase project slug e.g. `ng-firebase`
* Rename the following files:
    * `.firebase.example` to `.firebaserc`
    * `angular.json.example` to `angular.json`
    * `firebase.json.example` to `firebase.json`
    * `karma.conf.js.example` to `karma.conf.js`
    * `src/environment/environment.local.ts.example` to `src/environment/environment.local.ts`
    * `src/environment/environment.testing.ts.example` to `src/environment/environment.testing.ts`
    * `src/environment/environment.staging.ts.example` to `src/environment/environment.staging.ts`
    * `src/environment/environment.prod.ts.example` to `src/environment/environment.prod.ts`
* Delete the first group of lines in the `.gitignore` file referring to the files in the last step
* Run `npm install`
* Run `npm install --prefix functions`

## Setup Firebase
* Login into Firebase `firebase login`
* Init Firebase `firebase init`
* Update `firebaseConfig` in `src/environments` files. Settings can be found at https://console.firebase.google.com/project/FIREBASE_PROJECT_ID/settings/general

## Development server

Run `npm run start:local` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
