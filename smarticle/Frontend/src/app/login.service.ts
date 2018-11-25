import { Injectable } from '@angular/core'

var profile: string[] = ['','','','']

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  setProfile(profileID, profileName, profileEmail, profileImage) {
    profile = [profileID, profileName, profileEmail, profileImage]
    if (profile[0] != '') {
      document.getElementById('dropdown').classList.remove('hidden')
      document.getElementById('login').classList.add('hidden')
      document.getElementById('user').innerHTML = "<img style='width:30px;border-radius: 15px;-moz-border-radius: 15px;-webkit-border-radius: 15px;margin: 12.5px 16px;' src=" + profile[3] + ">"
    } else {
      document.getElementById('dropdown').classList.add('hidden')
      document.getElementById('login').classList.remove('hidden')
    }
  }

  getEmail() {
    return profile[2]
  }

}
