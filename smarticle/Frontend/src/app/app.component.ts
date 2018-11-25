import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

var http

declare const gapi: any
var GoogleAuth

var profile = ['','','','']

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(httpClient: HttpClient) {
    http = httpClient
    this.handleClientLoad()
  }
  
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient)
  }

  initClient() {
    gapi.client.init({
      clientId: '578367765944-d129ccumnher4f2mvhskabb88ufi6hqi.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
    }).then(function() {
      GoogleAuth = gapi.auth2.getAuthInstance()
      GoogleAuth.isSignedIn.listen(function() { setSigninStatus() })
      setSigninStatus()

      function setSigninStatus() {
        if (GoogleAuth.currentUser.get().hasGrantedScopes('profile email')) {
          profile = [GoogleAuth.currentUser.get().getBasicProfile().getId(),
                     GoogleAuth.currentUser.get().getBasicProfile().getName(),
                     GoogleAuth.currentUser.get().getBasicProfile().getEmail(),
                     GoogleAuth.currentUser.get().getBasicProfile().getImageUrl()]
          let email = {'email': profile[2], 'tags': []}
          http.post("http://smarticle.duckdns.org:3000/api/set-user", email).toPromise()
          .then(console.log('signed in'))
        } else {
          profile = ['','','','']
        }

        var loginService = new LoginService
        loginService.setProfile(profile[0],profile[1],profile[2],profile[3])
      }

    })
  }

  public userSignIn() {
    GoogleAuth.signIn()
  }
  
  public userSignOut() {
    GoogleAuth.signOut()
  }

}