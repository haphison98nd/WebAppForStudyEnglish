# -*- coding: utf-8 -*-

from SimpleEnglishSentencesJsonDbMaker import *

######################################################
######################################################

class SimpleEnglishSentencesJsonDbMakerForGogakuru(SimpleEnglishSentencesJsonDbMaker):

    ######################################################
    ######################################################

    def getTextPartNames (self, soup):
        partNames = soup.find_all(class_='info_prog')
        partNames = [partName.string for partName in partNames]
        return partNames

    ######################################################
    ######################################################

    def getTextPageNames (self, soup):
        pageNames = soup.find_all(class_='info_date')
        pageNames = [pageName.string for pageName in pageNames]
        return pageNames

    ######################################################
    ######################################################

    def getTextEngSentences (self, soup):
        engSentences = soup.find_all(class_='font-en')
        # engSentences = [sentence.string for sentence in engSentences]
        engSentences = [str(sentence).decode('utf-8') for sentence in engSentences]
        return engSentences

    ######################################################
    ######################################################

    def getTextJpnSentences (self, soup):
        jpSentences = soup.find_all(class_='jp')
        jpSentences = [sentence.string for sentence in jpSentences]
        return jpSentences

    ######################################################
    ######################################################

    def createDbKeys (self, partName):
        defaultDictForAssigningSentences = {"JPN":[], "ENG":[]}
        if partName not in self.db:
            self.__pageNumberMemory[partName] = 1
            self.db[partName]= {}
            self.db[partName]["Page " + str(self.__pageNumberMemory[partName])] = defaultDictForAssigningSentences
        else:
            if len(self.db[partName]["Page " + str(self.__pageNumberMemory[partName])]["JPN"]) == self.__sentencePerPage:
                self.__pageNumberMemory[partName] += 1
                self.db[partName]["Page " + str(self.__pageNumberMemory[partName])] = defaultDictForAssigningSentences

    ######################################################
    ######################################################

    def addText(self, partNames, jpSentences, engSentences):
        for idx in range(len(partNames)):
            self.createDbKeys(partNames[idx])
            self.db[partNames[idx]]["Page " + str(self.__pageNumberMemory[partNames[idx]])]["JPN"].append(jpSentences[idx])
            self.db[partNames[idx]]["Page " + str(self.__pageNumberMemory[partNames[idx]])]["ENG"].append(engSentences[idx])

    ######################################################
    ######################################################

    def startScraping (self):
        for pageIdx in range(self.pageIdxStart, self.pageIdxEnd + 1):
            soup = self.createTextHtmlSoup(self.targetUrl + str(pageIdx))
            partNames = self.getTextPartNames(soup)
            jpSentences = self.getTextJpnSentences(soup)
            engSentences = self.getTextEngSentences(soup)
            self.addText(partNames, jpSentences, engSentences)
            print "Processing: URL: " + self.targetUrl + str(pageIdx)
            self.saveDbAsJson("./temp")
        return self

    ######################################################
    ######################################################

    def __init__(self, targetUrl, pageIdxStart, pageIdxEnd, sentencePerPage = 10):
        SimpleEnglishSentencesJsonDbMaker.__init__(self, targetUrl, pageIdxStart, pageIdxEnd)
        self.__pageNumberMemory = {}
        self.__sentencePerPage = sentencePerPage
