import csv
import os

#save the basepath of the 3rd spreadsheet in the dataset.
basepath = "E:\Documents\GitProjects\Smarticle\smarticle\Machine Learning\Datasets\\Unzipped\\articles3.csv"

#open the csv, and print the title, and the content of each story in the csv.
with open(basepath, newline='', encoding= "utf8") as File:
    reader = csv.reader(File)
    for row in reader:
        print("title: "+ row[2] + " Content: " + row[9])
        print("\n")

