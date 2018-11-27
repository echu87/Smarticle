import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { HttpService } from './http.service';

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

  constructor(httpService: HttpService) {
    http = httpService
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
        var loginService = new LoginService()
        if (GoogleAuth.currentUser.get().hasGrantedScopes('profile email')) {
          profile = [GoogleAuth.currentUser.get().getBasicProfile().getId(),
                     GoogleAuth.currentUser.get().getBasicProfile().getName(),
                     GoogleAuth.currentUser.get().getBasicProfile().getEmail(),
                     GoogleAuth.currentUser.get().getBasicProfile().getImageUrl()]
                
          http.isUser(profile[2]).subscribe(data => {
            if (!data) {
              let email = {'email': profile[2], 'tags': []}
              let userCreatePromise = http.addUser(email).toPromise()
              userCreatePromise.then(console.log('signed in as ' + profile[2]))
              loginService.setProfile(profile[0], profile[1], profile[2], profile[3], [])
            } else {
              http.getTags(profile[2]).subscribe(tag => {
                console.log('signed in as ' + profile[2])
                loginService.setProfile(profile[0], profile[1], profile[2], profile[3], tag)
              })
            }
          })
        } else {
          console.log('signed out')
          profile = ['','','','']
          loginService.setProfile(profile[0], profile[1], profile[2], profile[3], [])
        }
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