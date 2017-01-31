# -*- coding: utf-8 -*-
"""
This module is scraping tool for making simple english sentences JSON database.
This database is going to used by SyunkanEisakubun (https://www.beret.co.jp/books/detail/249) web app.
Scraping target is: http://english-writing.mobi/workbook/question.php?theme_no= (1-79)
"""

import sys, urllib, codecs, json
from bs4 import BeautifulSoup

######################################################
######################################################

def getTextHtmlSoup (url):
    # if get html from web
    response = urllib.urlopen(url)
    html = response.read()
    # if get html from local
    # soup = BeautifulSoup(open("index.html"), "lxml")
    soup = BeautifulSoup(html, "lxml")
    return soup

######################################################
######################################################

def getTextTitle (soup):
    title = soup.find("h1").string
    return title

######################################################
######################################################

def getTextSentences (soup):
    sentences = soup.find_all("li")
    sentences = [sentence.string for sentence in sentences]
    return sentences

######################################################
######################################################
class SimpleEnglishSentencesJsonDbMaker:

    def addText(self, pageIdx, title, sentences):
        self.__db["page-" + str(pageIdx)] = {}
        self.__db["page-" + str(pageIdx)]["title"] = title
        self.__db["page-" + str(pageIdx)]["text"] = sentences
        return self

    ######################################################
    ######################################################

    def saveDbAsJson (self, pathForSave = "./"):
        # How to export Japanese file by using json.dump: http://d.hatena.ne.jp/tatz_tsuchiya/20120227/1330325015
        # How to encode text?: http://blog.livedoor.jp/yawamen/archives/51566670.html
        f = codecs.open(pathForSave + self.__dbName + ".json", 'w', "utf-8")
        stringifiedDb = json.dump(self.__db, f, ensure_ascii=False)
        f.close()
        return self
    ######################################################
    ######################################################

    def __init__(self, dbName):
        self.__dbName = dbName
        self.__db = {}

if __name__ == '__main__':
    dbMaker = SimpleEnglishSentencesJsonDbMaker("SimpleEnglishSentencesJsonDb")
    soup = getTextHtmlSoup('http://english-writing.mobi/workbook/question.php?theme_no=1')
    title = getTextTitle(soup)
    sentences = getTextSentences(soup)
    # sys.exit()
    dbMaker.addText(1, title, sentences).saveDbAsJson()
