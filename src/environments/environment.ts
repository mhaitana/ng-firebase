// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: null as boolean,
    environment: null as string,
    firebaseConfig: {
        apiKey: null as string,
        authDomain: null as string,
        databaseURL: null as string,
        projectId: null as string,
        storageBucket: null as string,
        messagingSenderId: null as string,
        appId: null as string
    },
    sendMailUrl: null as string,
    stripeChargeUrl: null as string,
    passwordRedirectUrl: null as string,
    emailVerificationRedirectUrl: null as string,
    stripePublishableKey: null as string
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
