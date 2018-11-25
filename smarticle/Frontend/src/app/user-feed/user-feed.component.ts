import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';

var http

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  tags: string[]
  searchString: any

  constructor(httpClient: HttpClient, private loginService: LoginService) {
    http = httpClient
  }

  ngOnInit() {
    this.searchString = document.getElementById("search")
  }

  addTag() {
    http.post('http://smarticle.duckdns.org:3000/api/add-tags', {email: this.loginService.getEmail(), tag: this.searchString.value.toLowerCase()}).toPromise()
    .then(this.searchString.value = "")
  }

}
