// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { hostname } from "os";

export const environment = {
  /* firebaseConfig: {
    apiKey: "AIzaSyDC6MsRZ9MSigRSCi17lPvnfsx9-_ueAsc",
    authDomain: "eatse-4dbd3.firebaseapp.com",
    projectId: "eatse-4dbd3",
    storageBucket: "eatse-4dbd3.appspot.com",
    messagingSenderId: "768781202854",
    appId: "1:768781202854:web:90029a8d89808179ea4b67",
    measurementId: "G-24592D18H2"
  },*/
  production: false,
  //developmentIP: 'http://localhost:5000',
  developmentIP: 'http://' + location.hostname + ':5000',
  //developmentIP: 'http://192.168.0.180:5000',
  //developmentIP: 'http://23.21.3.245:5000',
  flutterwavePublicKey: 'FLWPUBK-ec9db7d42d78c3e5587c8a1f6801cb4c-X',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
