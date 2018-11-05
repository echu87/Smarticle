import { Injectable } from '@angular/core';

declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
    gapi.load('auth2', function() {
      gapi.auth2.init()
   });
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
  }
  
}
