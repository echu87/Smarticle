import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message)
    else
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
    return throwError('Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient) {}

  getSourceList() {
    return this.http.get(decodeURI('http://smarticle.duckdns.org:3000/api/sources'))
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getSourceFeed(source, pg, pgl) {
    return this.http.get(decodeURI('http://smarticle.duckdns.org:3000/api/articles-by-source/' + source + '-' + pg + '-' + pgl))
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getSourceCount(source) {
    return this.http.get(decodeURI('http://smarticle.duckdns.org:3000/api/articles-length/' + source))
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  isUser(email) {
    return this.http.get(decodeURI('http://smarticle.duckdns.org:3000/api/is-user/' + email))
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  addUser(email) {
    return this.http.post('http://smarticle.duckdns.org:3000/api/set-user', email)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  addTag(userEmail, tagValue) {
    return this.http.post('http://smarticle.duckdns.org:3000/api/add-tags', {email: userEmail, tag: tagValue})
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  deleteTag(userEmail, tagValue) {
    return this.http.post('http://smarticle.duckdns.org:3000/api/delete-tags', {email: userEmail, tag: tagValue})
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getTags(email) {
    return this.http.get(decodeURI('http://smarticle.duckdns.org:3000/api/get-tags/' + email))
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

}
