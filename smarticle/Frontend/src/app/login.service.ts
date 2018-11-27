import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

var profile: string[] = ['','','','']
var tags: string[]

var signedInSubject = new BehaviorSubject<boolean>(false)
var tagsSubject = new BehaviorSubject<string[]>([])

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {}

  setProfile(profileID, profileName, profileEmail, profileImage, profileTags) {
    profile = [profileID, profileName, profileEmail, profileImage]
    tags = profileTags
    tagsSubject.next(tags)
    if (profile[0] != '') {
      document.getElementById('dropdown').classList.remove('hidden')
      document.getElementById('login').classList.add('hidden')
      document.getElementById('user').innerHTML = "<img style='width:30px;border-radius: 15px;-moz-border-radius: 15px;-webkit-border-radius: 15px;margin: 12.5px 16px;' src=" + profile[3] + ">"
      signedInSubject.next(true)
    } else {
      document.getElementById('dropdown').classList.add('hidden')
      document.getElementById('login').classList.remove('hidden')
      signedInSubject.next(false)
    }
  }

  getEmail() {
    return profile[2]
  }

  getSignedIn() {
    return signedInSubject
  }

  getTags() {
    return tagsSubject
  }

  addTag(tag) {
    tags.push(tag)
    tagsSubject.next(tags)
  }

  deleteTag(tag) {
    tags.splice(tags.indexOf(tag), 1)
    tagsSubject.next(tags)
  }

}
