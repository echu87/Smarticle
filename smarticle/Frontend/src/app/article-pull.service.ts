import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlePullService {

  constructor(private http: HttpClient) { }

  getSourceList() {
    return this.http.get(decodeURI('http://localhost:3000/sources'))
  }

  getSourceFeed(source) {
    return this.http.get(decodeURI('http://localhost:3000/articles-by-source/' + source))
  }

}
