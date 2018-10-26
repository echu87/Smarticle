import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articles-by-source',
  templateUrl: './articles-by-source.component.html',
  styleUrls: ['./articles-by-source.component.css']
})
export class ArticlesBySourceComponent implements OnInit {

  sources: any
  feeds: any
  
  selectedSource: any

  constructor(private http: HttpClient) {
    this.sources = this.http.get(decodeURI('http://localhost:3000/sources'))
    this.feeds = this.http.get(decodeURI('http://localhost:3000/articles-by-source'))
  }

  ngOnInit() {
    this.selectedSource = "CNN"
  }

  openURL(link) {
    window.open(link);
  }

}
