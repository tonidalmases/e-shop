# E-Shop

Implementation of the [Organic shop](https://github.com/mosh-hamedani/organic-shop) proposed by Mosh Hamedani for the course [The Complete Angular Course: Beginner to Advanced](https://www.udemy.com/course/the-complete-angular-master-class/):

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

I propose the use of different tools and libraries as a complement for the shop, so the implementation is not exactly the same as in the course:

- Use of the official Angular library for Firebase [@angular/fire](https://www.npmjs.com/package/@angular/fire).
- Latest implementation of [Cloud Firestore](https://firebase.google.com/docs/firestore) that allows more scalability, instead of the traditional [Firebase Realtime Database](https://firebase.google.com/docs/database).
- Implementation of Redux by using [@ngrx/store](https://ngrx.io/guide/store) in order to centralize the shopping cart.
- Internationalization (i18n) to Catalan by using [@angular/localize](https://angular.io/guide/i18n)

## Development server

Create the `environments/environment.ts` file and provide your `firebase` configuration.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
