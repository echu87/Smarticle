// import required packages
const express = require('express')
const cors = require('cors')
const cron = require('node-cron')
const mongoose = require('mongoose')
const parser = require('rss-parser')
const request = require('request')
const cheerio = require('cheerio')

// define corsOptions (i.e. whitelisted url)
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

// initialize express router and express server and pass corsOptions to server, define PORT variable (i.e. what PORT will we run our server on)
const backend = express()
backend.use(cors(corsOptions))

// backend.use(cors(corsOptions))
const router = express.Router()
const PORT = 3000

// routes
router.get('/sources', function(req, res) {
    var sources = new Array()
    for (var i = 1; i < FEED.length; i+=3)
        sources.push(FEED[i])
    res.send(sources)
})

router.get('/articles-by-source', function(req, res) {
    article.find(function(err, data) {
        if (err) console.log(err);
        var dataBySource = new Array;

        for (var i = 1; i < FEED.length; i+=3) {
            var sourceData = new Array;
            var currentSource = FEED[i];
            for (var j = 0; j < data.length; j++) {
                if (data[j].source == currentSource)
                    sourceData.push(data[j])
            };
            if (sourceData.length > 0)
                dataBySource.push(sourceData)
        };
        res.send(dataBySource)
    })
})

backend.use(router)

// connect to mongo database and start express server on specified PORT
const uri = "mongodb+srv://MatthewHobbs:<password>@biadet-news-cluster-hdjcp.mongodb.net/biadet-news-database?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if (err) console.log(err)

    else {
        // define article schema for passing information to database
        articleSchema = new mongoose.Schema({ source: 'string', title: 'string', link: 'string', pubDate: 'string', description: 'string', content: 'string' })
        article = mongoose.model('article', articleSchema)

        backend.listen(PORT, function() {
            console.log('server started on port ' + PORT)
            // schedule to call parseArticle function on a regular basis
            cron.schedule('*/1 * * * *', () => { parseArticles() })
        })
    }
})

// array containing the rss-feeds and tags required to parse the article information
const FEED = [
    'http://rss.cnn.com/rss/cnn_world.rss','CNN', '.zn-body__paragraph',
    'http://feeds.foxnews.com/foxnews/world','Fox News', 'p',
    'https://abcnews.go.com/abcnews/topstories','ABC News', 'p',
    'https://www.cbsnews.com/latest/rss/main','CBS News', 'p',
    'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml','The New York Times', 'p',
    'https://www.huffingtonpost.com/section/front-page/feed','The Huffington Post', 'p',
    'http://feeds.bbci.co.uk/news/rss.xml','BBC News', 'p',
    'http://rssfeeds.usatoday.com/usatoday-NewsTopStories','USA Today', 'p',
    'https://globalnews.ca/feed/','Global News', 'p',
    'http://feeds.skynews.com/feeds/rss/home.xml','Sky News', 'p',
    'https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009','CTV News', 'p',
    'http://feeds.reuters.com/reuters/topNews','Reuters', 'p',
    'http://www.thestar.com/content/thestar/feed.RSSManagerServlet.topstories.rss','Toronto Star', 'p',
    'http://www.latimes.com/rss2.0.xml','The Los Angeles Times', 'p',
    'https://www.politico.com/rss/politics08.xml', 'Politico', 'p',
    'https://www.aljazeera.com/xml/rss/all.xml', 'Al Jazeera', 'p',
    'https://www.cnbc.com/id/100727362/device/rss/rss.html', 'CNBC', 'p'
]

// function to pull all article information from the specified sources and save it to the mongo database
function parseArticles() {
    var titleList = new Array()
    let promise = new Promise((resolve, reject) => {
        console.log('started updating mongo database @ ' + Date())
        // pull all articles from mongo database
        article.find((err, data) => {
            if (err) console.log(err)
            // loop through data and add each article title to titleList
            data.forEach(article => titleList.push(article.title))
            // resolve promise
            resolve()
        });
    })

    promise.then(() => {
        let promise = new Promise(async (resolve, reject) => {
            // loop through each url that is provided in the FEED array
            for (var i = 0; i < FEED.length; i+=3) {
                try {
                    // initialize new parser and parse rss information from url (FEED[i])
                    let Parser = new parser()
                    let feed = await Parser.parseURL(FEED[i])
                    // loop through each article in the specific url's feed
                    feed.items.forEach(item => {
                        // continue the process if the article includes a description (item.content), a publish date (item.pubDate), and it is less than 14 days old (1209600000 milliseconds = 14 days)
                        if (item.contentSnippet.length > 10 && item.pubDate && new Date().getTime() - Date.parse(item.pubDate) < 1209600000) {  
                            new Promise((resolve, reject) => { 
                                // push the following information to the next step of the promise                               
                                resolve([FEED[i+2], FEED[i+1], item.title, item.link, item.pubDate, item.contentSnippet])
                            }).then(result => {
                                // continue the process if titleList does not contain the article title (i.e. the article is not already in the database)
                                if (!titleList.includes(result[2])) {
                                    // gather html code from the article's url with request
                                    request(result[3], (error, response, html) => {
                                        var iContent = ""
                                        if (!error) {
                                            // parse article text from html code using cheerio and html tag provided in FEED
                                            var $ = cheerio.load(html);
                                            $(result[0]).filter(function() {
                                                iContent += $(this).text() + " "
                                            })      
                                        }
                                        // continue the process if the article is longer that 25 characters (unable to generate accurate synopsis if article is too short)
                                        if (iContent.length > 25) {
                                            // push article information to mongo database
                                            new article({ source: result[1], title: result[2], link: result[3], pubDate: result[4], description: result[5], content: iContent }).save(err => { 
                                                if (err) console.log(err)
                                            });
                                            console.log('[ADDED] [' + result[1] + '] ' + result[2])
                                        }
                                    }) 
                                }       
                            })
                        }
                    })
                } catch (err) { console.log(FEED[i+1] + ' Not Responding') }
            }
            // resolve promise after a 5 seconds timeout, ensures function is finished parsing all articles before promise is resolved
            setTimeout(resolve, 5000)
        })

        promise.then(() => {
            var currentArticles = new Array()
            // pull all articles from mongo database
            article.find((err, data) => {
                if (err) console.log(err)
                // loop through data and delete all old articles
                // this section of code includes a currentArticles array to delete accidental duplicate articles,
                // articles are duplicated if the function is accidentally called twice or the rss feed contains the same article in two places
                data.forEach(article => {
                    if (new Date().getTime() - Date.parse(article.pubDate) > 1209600000 || currentArticles.includes(article.title) || article.description.length < 10)
                        article.collection.deleteOne({ _id: article._id })
                    currentArticles.push(article.title)
                })
                console.log('finished updating mongo database @ ' + Date())
            });
        })
    })
}