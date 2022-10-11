// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBhXkBf-Ecb2dybaPd6RZvEsJRvhPQ5pLw",
    authDomain: "portfilio-weather-angular-ts.firebaseapp.com",
    databaseURL: "https://portfilio-weather-angular-ts-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "portfilio-weather-angular-ts",
    storageBucket: "portfilio-weather-angular-ts.appspot.com",
    messagingSenderId: "565645053945",
    appId: "1:565645053945:web:a961da3f6609a7f1fff728",
    measurementId: "G-40NYT876JT"
  },
  token: {
    type: "service_account",
    project_id: "portfilio-weather-angular-ts",
    private_key_id: "b407546a83f13e1f92126c6fefb371d9f0dc6265",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDha3iogk8lzX+3\na2Dj6OSNvK8cGuW1GMgmU6iZD4LKIv2VcJmZS0InwxCX1Zq3EcaTpASr/PDqvG3/\n2sPwZNewhbO/dudne8kLOtFk7FXT7Xxkki0ozhKMOu3zFM+zmCYzkNPPqIz+aYLL\n0KzokUpyAUi7MtIqUMcU1ud688V4oLloP6iriLy6rRSrXWicINO+YpCCCOqlgGFX\nMHtHw6EkD5ZCLcNB28O4os6qLyIse+g3l7jyhgiEd3q201K6eWFTA6qg509/8192\nLEw1xwvciW1VxJ1tOE33xBgXeNELr6cy+VwisZxXFkEOgZU5Ju+QhwDChWV4EFrh\nMzHNY9yzAgMBAAECggEANrONPpsMmNhS31Az3WqVF94LQk82oeknHMHdXnM4olO2\nZK7D30K3hY2c97NyjW1HWmmJZrEFR3k9WkKcnLfj7WaslVBF3ENaKJr32D1PoJN3\nRbKBOe8z6gqc1omc03CfCJFjDPfSayRwhIQZiYBEaADuxNqSzIj4npJ97sS8DUbC\ns4y4kxgrmVPxJLXTpkSX4FzUIVz74QrEaigls5uebzXJOGjrKA6AGioywaTpfTF4\nzEAR4dng5ye20XouOb1wQiu8hotM3mU7H3vzK8BeOB4HzIMDZjCLC99OPeNiJ0dS\nISu0lFtabBHody/sp05Kz9gPN6wQbn24jLqZc1USWQKBgQD7Bu/f8UKWCrgY8WKT\n7rzNC+exoKHXK2Nm0u3wRzwkbG67QDVNSQdmkCx+/+68K5X0LBuYgYvwNAo2gPow\nGLxe+m+8zDKQhKXimwq9+SwEi5CBactGGzUbtaqLSGHLb0rsN8OaIVhz/F8R7bN6\nuTMmpxgzyHN9UhMySFY6J0KNGwKBgQDl4qtJNaFOSUPTyYOT6L6ssOg+DSkljbmi\n2FeRa7LP0j3HcEP6r0/HFx7p0DKeAOo8Oonthwq2DIkVJ82x7eg2uWLD7wcPU70M\nW6g2mdjqD2F5NphVXH4cIEYvd4UPmLc4rO65tMqnWHLX5YFUvlAyP71KAdkt1PAH\n31/A2PbgSQKBgQCOt6bxXy1IONfp9nLhQD4/JaGYr4bT2mstLobwsM9UtgFOnHax\nde+rNBTYL5H/kZgztlAKKLzy1+NmkXWsmqOeLCwS3tVwrLnTV+qHj36jJuYFbayQ\nMy/CjUpk3cYb7y5dlmay3np3luhGPSppf5nBRAbSigh/G4amc9HyRhfkOQKBgDWG\nODFcfkk2/8bg5XTbvQGCUyCXedwXioBi9MiUFdcTcXTtK7bDeMS3GmiAJDjrp54M\nVy7pwVGvy38UfG0QIoATW+6YycEE00B8WscTvRCKMjzBvGgrl+U+knjc0CtYeFiG\n0zKD6KdcDak884bipNN+SblggsuMB7MdjDLfkWOZAoGBAM5yVMokS3MiTqSbQkfT\ndh1FkGV9B8bDoXyhA9UArPVv5C1rVGxukTYzOvQl80UXlAdjS+3x+1VgtvAmsaf7\nuSgCu91cbLbA0BR/lWSOPI3um/qDekSjPQREEb9nW2U6P7xbTXmpHWLHbi2qi32M\n6gagh37pho60s+Pc7+rFjnkl\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-2137d@portfilio-weather-angular-ts.iam.gserviceaccount.com",
    client_id: "109304441898088648389",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2137d%40portfilio-weather-angular-ts.iam.gserviceaccount.com"
  },
  keysApi: {
    hereSite: "VOxC7kPhPTFGaaEDupCF-J6TwdH7i4UavjO4CBzfjTU",
    weatherAPI: "599cb26395c436e3744755f147138dd6",
    openMeteo: "https://api.open-meteo.com/v1/forecast?latitude=35.69393&longitude=139.75371&hourly=temperature_2m,windspeed_10m"
  }
};
export const meteo = environment.keysApi.openMeteo;
export const apiKey = environment.keysApi.hereSite;
export const app = initializeApp(environment.firebaseConfig);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
