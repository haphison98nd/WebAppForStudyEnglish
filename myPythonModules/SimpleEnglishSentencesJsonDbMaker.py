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

    def createTextHtmlSoup (self, url):
        # if get html from web
        response = urllib.urlopen(url)
        html = response.read()
        # if get html from local
        # soup = BeautifulSoup(open("index.html"), "lxml")
        soup = BeautifulSoup(html, "lxml")
        return soup

    ######################################################
    ######################################################

    def getTextTitle (self, soup):
        title = soup.find("h1").string
        return title

    ######################################################
    ######################################################

    def getTextSentences (self, soup):
        sentences = soup.find_all("li")
        sentences = [sentence.string for sentence in sentences]
        return sentences

    ######################################################
    ######################################################

    def addText(self, pageIdx, title, sentences):
        self.db["page-" + str(pageIdx)] = {
            "title":title,
            "text":sentences
        }

    ######################################################
    ######################################################

    def saveDbAsJson (self, filePathForSavingDb):
        # How to export Japanese file by using json.dump: http://d.hatena.ne.jp/tatz_tsuchiya/20120227/1330325015
        # How to encode text?: http://blog.livedoor.jp/yawamen/archives/51566670.html
        f = codecs.open(filePathForSavingDb + ".json", 'w', "utf-8")
        json.dump(self.db, f, indent=4, sort_keys=True, ensure_ascii=False)
        f.close()
        return self

    ######################################################
    ######################################################

    def getDbAsDict (self):
        return self.db

    ######################################################
    ######################################################

    def startScraping (self):
        for pageIdx in range(self.pageIdxStart, self.pageIdxEnd + 1):
            soup = self.createTextHtmlSoup(self.targetUrl + str(pageIdx))
            title = self.getTextTitle(soup)
            sentences = self.getTextSentences(soup)
            self.addText(pageIdx, title, sentences)
            print "Processing: URL: " + self.targetUrl + str(pageIdx)
            self.saveDbAsJson("./temp")
        return self

    ######################################################
    ######################################################

    def __init__(self, targetUrl, pageIdxStart, pageIdxEnd):
        self.db = {}
        self.targetUrl = targetUrl
        self.pageIdxStart = pageIdxStart
        self.pageIdxEnd   = pageIdxEnd
