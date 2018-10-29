import { Component, OnInit } from '@angular/core';
import { ArticlePullService } from '../article-pull.service';

@Component({
  selector: 'app-articles-by-source',
  templateUrl: './articles-by-source.component.html',
  styleUrls: ['./articles-by-source.component.css']
})
export class ArticlesBySourceComponent implements OnInit {

  sources: any
  feed: any

  selectedSource: any
  searchString: any

  constructor(private articlePullService: ArticlePullService) { }

  ngOnInit() {
    this.searchString = document.getElementById("search")
    document.getElementById("search").onkeyup = function(){}

    this.sources = this.articlePullService.getSourceList()
    this.setFeed('CNN')
  }

  setFeed(source) {
    this.selectedSource = source
    this.feed = this.articlePullService.getSourceFeed(this.selectedSource)
  }

  openURL(link) {
    window.open(link);
  }

}
