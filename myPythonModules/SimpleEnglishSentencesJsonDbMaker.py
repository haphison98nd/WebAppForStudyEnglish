# -*- coding: utf-8 -*-

"""
This class is scraping tool for making simple english sentences JSON database.
This database is going to used by SyunkanEisakubun (https://www.beret.co.jp/books/detail/249) web app.
Scraping target is: http://english-writing.mobi/workbook/question.php?theme_no= (1-79)
"""

import sys, urllib, codecs, json
from bs4 import BeautifulSoup

######################################################
######################################################

class SimpleEnglishSentencesJsonDbMaker:

    def __createTextHtmlSoup (self, url):
        # if get html from web
        response = urllib.urlopen(url)
        html = response.read()
        # if get html from local
        # soup = BeautifulSoup(open("index.html"), "lxml")
        soup = BeautifulSoup(html, "lxml")
        return soup

    ######################################################
    ######################################################

    def __getTextTitle (self, soup):
        title = soup.find("h1").string
        return title

    ######################################################
    ######################################################

    def __getTextSentences (self, soup):
        sentences = soup.find_all("li")
        sentences = [sentence.string for sentence in sentences]
        return sentences

    ######################################################
    ######################################################

    def __addText(self, pageIdx, title, sentences):
        self.__db["page-" + str(pageIdx)] = {
            "title":title,
            "text":sentences
        }

    ######################################################
    ######################################################

    def saveDbAsJson (self):
        # How to export Japanese file by using json.dump: http://d.hatena.ne.jp/tatz_tsuchiya/20120227/1330325015
        # How to encode text?: http://blog.livedoor.jp/yawamen/archives/51566670.html
        f = codecs.open(self.__pathForSave + self.__dbName + ".json", 'w', "utf-8")
        json.dump(self.__db, f, indent=4, sort_keys=True, ensure_ascii=False)
        f.close()
        return self

    ######################################################
    ######################################################

    def getDbAsDict (self):
        return self.__db

    ######################################################
    ######################################################

    def startScraping (self):
        for pageIdx in range(self.__pageIdxStart, self.__pageIdxEnd + 1):
            soup = self.__createTextHtmlSoup(self.__targetUrl + str(pageIdx))
            title = self.__getTextTitle(soup)
            sentences = self.__getTextSentences(soup)
            self.__addText(pageIdx, title, sentences)
            print "Processing: URL: " + self.__targetUrl + str(pageIdx)
        return self

    ######################################################
    ######################################################

    def __init__(self, dbName, targetUrl, pageIdxStart, pageIdxEnd, pathForSave = "./"):
        self.__dbName = dbName
        self.__db = {}
        self.__targetUrl = targetUrl
        self.__pageIdxStart = pageIdxStart
        self.__pageIdxEnd   = pageIdxEnd
        self.__pathForSave  = pathForSave
