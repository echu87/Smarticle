import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.pg = 1
    this.pgl = 25

    this.searchString = document.getElementById("search")
    document.getElementById("search").onkeyup = function(){}

    this.sources = this.httpService.getSourceList()
    this.sources.subscribe(sources => {
      this.setFeed(sources[0])
    })
  }

  setFeed(source) {
    this.pg = 1
    var isCount
    if (this.pgl == this.count)
      isCount = true
    
    this.selectedSource = source
    var countFeed = this.httpService.getSourceCount(this.selectedSource)
    countFeed.subscribe(count => {
      this.count = count
      if (isCount)
        this.pgl = count
      this.updateFeed()
      this.setCount()
    })
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
    this.feed = this.httpService.getSourceFeed(this.selectedSource, this.pg, this.pgl)
  }

  setCount() {
    this.displayCount = this.pg * this.pgl
    if (this.pg * this.pgl >= this.count)
      this.displayCount = this.count
    this.setColor()
  }

  setColor() {
    document.getElementById('prev').style.background = "black"
    document.getElementById('prev').style.color = "white"
    document.getElementById('next').style.background = "black"
    document.getElementById('next').style.color = "white"

    document.getElementById('prev').classList.add('cursor')
    document.getElementById('next').classList.add('cursor')

    if (this.pg == 1) {
      document.getElementById('prev').style.background = "#E7E7E7"
      document.getElementById('prev').style.color = "black"
      document.getElementById('prev').classList.remove('cursor')
    } else if (this.pg * this.pgl >= this.count) {
      document.getElementById('next').style.background = "#E7E7E7"
      document.getElementById('next').style.color = "black"
      document.getElementById('next').classList.remove('cursor')
    }

    if (this.pgl == this.count)
      document.getElementById('all').style.background = "#FDD42F"
    else
      document.getElementById('all').style.background = "#E7E7E7"
    var types = [10, 25, 50]
    types.forEach(itemNum => {
        if (this.pgl == itemNum)
          document.getElementById('' + itemNum).style.background = "#FDD42F"
        else
          document.getElementById('' + itemNum).style.background = "#E7E7E7"
    })
  }

  openURL(link) {
    window.open(link)
  }

}
