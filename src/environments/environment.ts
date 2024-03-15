// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultLanguage: 'es',
  availableLanguages: ['es', 'eu', 'en'],
  prefix: 'TRABACAR_',
  defaultPosition: {
    lontitude: -3.199353,
    latitude: 43.190913
  },
  mapZoom : 16,

  firebaseConfig: {
    apiKey: "AIzaSyD6irneWJYf4dYI6gFbLm8V2FIJEHE782E",
    authDomain: "trabacar-36366.firebaseapp.com",
    databaseURL: "https://trabacar-36366-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "trabacar-36366",
    storageBucket: "trabacar-36366.appspot.com",
    messagingSenderId: "410699824207",
    appId: "1:410699824207:web:70c713ff89247380c87e3a",
    measurementId: "G-8MQ4HG52EN"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
