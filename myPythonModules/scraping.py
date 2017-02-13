# -*- coding: utf-8 -*-

from SimpleEnglishSentencesJsonDbMaker import *

######################################################
######################################################

if __name__ == '__main__':
    dbMakerJPN = SimpleEnglishSentencesJsonDbMaker("http://english-writing.mobi/workbook/question.php?theme_no=", 1, 79)
    dbMakerJPN.startScraping().saveDbAsJson("../TextDB/SimpleEnglishSentencesJsonDb_JPN")
    dbMakerENG = SimpleEnglishSentencesJsonDbMaker("http://english-writing.mobi/workbook/answer.php?theme_no=", 1, 79)
    dbMakerENG.startScraping().saveDbAsJson("../TextDB/SimpleEnglishSentencesJsonDb_ENG")
