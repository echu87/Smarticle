import { Component, OnDestroy, ApplicationRef, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnDestroy, OnInit {

  signedInSubscription: Subscription
  tagsSubscription: Subscription

  searchString: any
  signedIn: boolean = false
  tags: string[]

  constructor(private loginService: LoginService, private httpService: HttpService, public applicationRef: ApplicationRef) {
    this.signedInSubscription = this.loginService.getSignedIn().subscribe(value => {
      this.signedIn = value 
      this.applicationRef.tick()
      this.searchString = document.getElementById("search")
    })
    this.tagsSubscription = this.loginService.getTags().subscribe(value => {
      this.tags = value
      this.applicationRef.tick()
      this.searchString = document.getElementById("search")
    })
  }

  ngOnInit() {
    this.searchString = document.getElementById("search")
  }

  ngOnDestroy() {
    this.signedInSubscription.unsubscribe()
    this.tagsSubscription.unsubscribe()
  }

  addTag() {
    var value = this.searchString.value.toLowerCase()
    value = value.charAt(0).toUpperCase() + value.slice(1)
    this.searchString.value = ''
    if (value != '') {
      this.httpService.addTag(this.loginService.getEmail(), value).subscribe(data => {
        if (data)
          this.loginService.addTag(value)
      })
    }
  }

  deleteTags() {
    this.deleteTagsArray.forEach(tag => {
      let deletePromise = this.httpService.deleteTag(this.loginService.getEmail(), tag).toPromise()
      deletePromise.then()
      this.loginService.deleteTag(tag)
    })
    this.deleteOption = false
    this.deleteTagsArray = []
    this.applicationRef.tick()
  }

  deleteOption: boolean = false
  changeDeleteOption() {
    this.deleteOption = !this.deleteOption
    this.deleteTagsArray = []
    this.applicationRef.tick()
  }

  deleteTagsArray: string[] = []
  addDeleteTag(value) {
    if (!this.deleteTagsArray.includes(value)) {
      this.deleteTagsArray.push(value)
      document.getElementById(value).style.color = "rgb(255, 49, 49)"
      document.getElementById(value).innerText = "remove_circle"
    }
    else {
      this.deleteTagsArray.splice(this.deleteTagsArray.indexOf(value), 1)
      document.getElementById(value).style.color = "white"
      document.getElementById(value).innerText = "add_circle"
    }
    this.applicationRef.tick()
  }

}
