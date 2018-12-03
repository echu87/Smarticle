import warnings
warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')
import gensim
import os
import csv
from gensim.models.doc2vec import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity


filename = '\\articles1.csv'
csv.field_size_limit(100000000)
basepath = os.path.dirname(os.path.abspath('../Doc2Vec.py')) + "\\Datasets"
#global variable for the tag for each TaggedDocument
article_tag = 0
#preset distance value
similar_distance = 0.55

'''
parse_csv(path):
Takes a local csv, and creates a TaggedDocument object with the content

Parameters
----------
path: file path of the csv that should be parsed as a string
'''

def parse_csv(path):
    with open(path, newline='', encoding="utf8") as File:
        reader = csv.reader(File)
        count = 0
        tagged_docs = []
        for row in reader:
            if count < 10000:
                count+=1
                # For training data, add tags
                tagged_docs.append(gensim.models.doc2vec.TaggedDocument(gensim.utils.simple_preprocess(row[9]), [count]))
    return tagged_docs

'''
tag_article(content):
Takes the content of an article and turns it into a TaggedDocument object 

Parameters
----------
content: articles content as a string
'''
def tag_article(content):
    global article_tag
    doc = gensim.models.doc2vec.TaggedDocument(gensim.utils.simple_preprocess(content), article_tag)
    article_tag+=1
    return doc

'''
compute_similarity(tagged_article1, tagged_article2):
Computes the cosine similarity of two articles, and returns true if the articles should be classified as the same topic. 

Parameters
----------
tagged_article1, tagged_article2: TaggedDocument object for the articles that are being compared
'''
def compute_similarity(tagged_article1, tagged_article2):
    model = Doc2Vec.load("Doc2Vec_Model")
    vec1 = []
    vec2 = []
    vec1.append(model.infer_vector(tagged_article1.words))
    vec2.append(model.infer_vector(tagged_article2.words))
    distance = cosine_similarity(vec1, vec2)

    if distance[0][0] >= similar_distance:
        return True
    else:
        return False

article1 = tag_article("Keep Me Logged In There is a pretty good chance stocks will be higher in a year's time as positive sentiment has moderated and earnings growth will likely remain strong, according to Citi's Tobias Levkovich. Back in September, we were deeply concerned that investors were too optimistic, Levkovich, the bank's chief U.S. equity strategist, wrote in a note to clients. But sentiment has shifted following the rout of the past two months. Low-end neutral readings argue for a 90% probability of gains in the next 12 months versus September's 70% chance of a down market – a very marked change. Levkovich added that the bank's normalized earnings yield gap work, which incorporates both cyclically adjusted P/E ratios and the five-year forward swap contracts 10-year Treasury yield levels ... it implies a 90% chance of an up market in 12 months. The S&P 500 fell into a correction recently, dropping more than 10 percent from an all-time high reached on Sept. 21, before rebounding from those levels. We understand the anxiety, but the environment is not the same as in 2007, yet the bears are still out, he said. Notably, we were concerned in September when most were not, and now we feel more upbeat when others are less sanguine. Stocks fell under pressure as investors worried about rising interest rates and the impact a trade war with China would have on the global economy. These two concerns have been quelled, at least temporarily. On Wednesday, Federal Reserve Chair Jerome Powell said the current interest-rate level was just below neutral, hinting at fewer rate hikes down the road. Back in October, Powell said rates were a long way from neutral. Meanwhile, President Donald Trump and Chinese President Xi Jinping agreed over the weekend to hold off on additional tariffs on U.S. and China's goods for 90 days. This pause lifted equity prices broadly, with the major indexes all trading about 1 percent higher on Monday. Admittedly, handicapping the ramifications of trade protectionism is very difficult, as are geopolitical risks, but the endogenous trends are more sanguine even as housing and autos face challenges from higher interest rates, Levkovich said. Fortunately, the growth in consumer spending, generally, and the service sector, specifically, provide underlying economic (and thereby earnings) support. Got a confidential news tip? We want to hear from you. Sign up for free newsletters and get more CNBC delivered to your inbox Get this delivered to your inbox, and more info about our products and services. Privacy Policy. © 2018 CNBC LLC. All Rights Reserved. A Division of NBCUniversal Data is a real-time snapshot *Data is delayed at least 15 minutes. Global Business and Financial News, Stock Quotes, and Market Data and Analysis. Data also provided by")
article2 = tag_article("Supported by By Amie Tsang and Matthew Phillips Stocks rose on Wall Street Monday after President Trump and President Xi Jinping reached an agreement to ease trade tensions between the United States and China. Exporting giants such as Boeing, Caterpillar and Deere pulled the export-reliant S&P 500 industrial sector higher. Semiconductor makers, which have been hurt by the trade war’s potential to disrupt their widespread production networks in Asia, rose as well. Still, early gains were tempered by doubts that the fragile ceasefire — essentially a 90-day postponement of additional American tariffs on Chinese imports — would put the dispute between the world’s two largest economies to rest permanently. The S&P 500 was up by just over 1 percent by midafternoon, after rising nearly 1.4 percent in early trading. Just because they have a truce for three months doesn’t mean this thing is going away, said Jurrien Timmer, director of global macro at the asset manager Fidelity Investments in Boston. Earlier, Asian and European equity markets posted solid increases. Chinese shares climbed more than 2.5 percent, while stocks in Germany, an export-focused economy with strong trade ties to China, rose nearly 2 percent. Other markets responded in kind to the trade truce, which was reached Saturday in Buenos Aires. Soybeans rose on commodities markets on the prospect that China would begin to buy American crops again. China’s currency, the renminbi, strengthened against the United States dollar. The détente, forged by Mr. Trump and Mr. Xi over a dinner, merely postpones a larger reckoning over trade. Under the deal, the United States will postpone an increase in tariffs that was set to be imposed Jan. 1, and it sets a March 1 deadline for the countries to reach a more extensive pact. The deal leaves in place American tariffs on $250 billion in Chinese goods and the retaliatory measures enacted by Beijing. It is unclear whether the countries can resolve such thorny questions as the Chinese government’s support for sensitive industries and protections for American-created intellectual property. Still, the relatively good outcome of the meeting between Mr. Xi and Mr. Trump adds to the sense of relief for investors. A range of worries — about the Federal Reserve’s plans to continue raising interest rates, the impact of the midterm elections in the United States, the trade war and signs of slowing global growth — weighed on stocks in October and November. After it peaked on Sept. 20, the stock market’s gains for the year melted away as the S&P 500 slumped more than 10 percent through Nov. 23. Several recent developments had also helped allay those concerns. Last week, the Fed chairman, Jerome H. Powell, sparked a rally in the stock market when he said interest rates were just below a range of estimates for the neutral level, meaning the Fed was nearing the point where it would not be tapping on the brakes or pressing on the gas on the American economy. His statements raised investor hopes that the Fed might not lift interest rates as high as previously thought. Meanwhile, the just-completed third-quarter earnings season showed corporate profits remained strong. The midterm elections on Nov. 6 went largely as expected, with Democrats taking control of the House of Representatives and Republicans retaining control of the Senate. What were the worry points? Earnings and sales, the election, China, interest rates, said Richard Nackenson, a portfolio manager at the asset management firm Neuberger Berman. Wow, guess what. It’s all been mitigated. Mr. Nackenson stressed, however, that the market’s worries had not been resolved. On Monday, the Russell 2000 index of small capitalization stocks, made up of companies that are typically more sensitive to the health of the American economy, didn’t fare as well as the broader markets. And the yield on the 10-year Treasury note, often viewed as a barometer for growth and inflation, slipped to 2.99 percent. Investors are also acutely aware that with the conflict between China and the United States far from resolved, stock market enthusiasm may be fleeting. We see it obviously as a positive that there is a pause in the trade war talk, said Richard Weiss, chief investment officer for multi-asset strategies at American Century Investments. But it could reignite at any moment.")
print(compute_similarity(article1, article2))
