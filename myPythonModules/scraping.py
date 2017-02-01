# -*- coding: utf-8 -*-

from SimpleEnglishSentencesJsonDbMaker import *

######################################################
######################################################

if __name__ == '__main__':
    dbMakerJPN = SimpleEnglishSentencesJsonDbMaker("SimpleEnglishSentencesJsonDb_JPN", "http://english-writing.mobi/workbook/question.php?theme_no=", 1, 80, "../TextDB/")
    dbMakerJPN.startScraping().saveDbAsJson()
    dbMakerENG = SimpleEnglishSentencesJsonDbMaker("SimpleEnglishSentencesJsonDb_ENG", "http://english-writing.mobi/workbook/answer.php?theme_no=", 1, 80, "../TextDB/")
    dbMakerENG.startScraping().saveDbAsJson()
