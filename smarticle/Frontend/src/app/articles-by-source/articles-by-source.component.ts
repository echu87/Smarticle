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

  pg: any
  pgl: any
  count: any
  displayCount: any

  constructor(private articlePullService: ArticlePullService) { }

  ngOnInit() {
    this.pg = 1
    this.pgl = 20

    this.searchString = document.getElementById("search")
    document.getElementById("search").onkeyup = function(){}

    this.sources = this.articlePullService.getSourceList()
    this.sources.subscribe(sources => {
      this.setFeed(sources[0])
    })
  }

  setFeed(source) {
    this.selectedSource = source
    this.updateFeed()

    this.pg = 1
    var countFeed = this.articlePullService.getSourceCount(this.selectedSource)
    countFeed.subscribe(count => {
      this.count = count
    })
    this.setCount()
  }

  nextPage() {    
    if (this.pg * this.pgl < this.count) {
      this.pg += 1
      this.updateFeed()
    }   

    this.setCount()
  }

  prevPage() {
    if ((this.pg - 1) * this.pgl != 0) {
      this.pg -= 1
      this.updateFeed()
    } 

    this.setCount()
  }

  updateFeed() {
    this.feed = this.articlePullService.getSourceFeed(this.selectedSource, this.pg, this.pgl)
  }

  setCount() {
    this.displayCount = this.pg * this.pgl
    if (this.pg * this.pgl > this.count)
      this.displayCount = this.count
  }

  openURL(link) {
    window.open(link);
  }

}
