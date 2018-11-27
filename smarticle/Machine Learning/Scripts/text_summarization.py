import csv
from gensim.summarization import summarize, keywords
import os

csv.field_size_limit(100000000)

basepath = os.path.dirname(os.path.abspath('../Doc2Vec.py')) + "\\Datasets"
def parse_csv(path, tokens_only = False):
    with open(path, newline='', encoding="utf8") as File:
        reader = csv.reader(File)
        input =[]
        output =[]
        #key = []
        count = 0
        for row in reader:
            if count<=3 and count!=0:
                input.append(row[9])
                output.append(summarize(row[9], ratio = 0.1))
                #key.append(keywords(row[9], ratio = .03).split("\n"))
            count += 1
        return input, output





