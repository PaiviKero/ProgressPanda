# ProgressPanda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

Frontend is deployed at https://progresspanda.onrender.com/
Backend is deployed at https://progresspanda-backend.onrender.com/

## Backend

To run backend locally:

1. cd backend
2. npm ci/install
3. npm run dev

Runs by default at http://localhost:3000
Can be changed by adding HOST / PORT into .env file.

### Tests

Tests are in src/**tests** directory. Write them, make sure they work. They are run automatically after each push to main branch before deployment.

1. npm test
2. npm lint

## Backend

To run frontend locally:

1. npm ci/install
2. npm start

Runs by default at http://localhost:3000
Can be changed by adding HOST / PORT into .env file.

### Tests

Tests are in spec.ts files. Write them, make sure they work. They are run automatically after each push to main branch before deployment.

1. npm test
2. npm lint

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
