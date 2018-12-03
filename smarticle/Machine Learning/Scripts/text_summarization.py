import csv
from gensim.summarization import summarize, keywords


csv.field_size_limit(100000000)

'''
parse_csv(content):
Takes the content of an article and turns it into a summarized version of the text

Parameters
----------
content: articles content as a string
'''
def summarize_text(content):
        input =[]
        output =[]
        key = []

        input.append(content)
        output.append(summarize(content, ratio = 0.1))
        #work in progress
        #key.append(keywords(content, ratio = .03).split("\n"))

        return input, output







