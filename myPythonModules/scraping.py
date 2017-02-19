# -*- coding: utf-8 -*-

from SimpleEnglishSentencesJsonDbMaker import *
from SimpleEnglishSentencesJsonDbMakerForGogakuru import *

######################################################
######################################################

if __name__ == '__main__':
    # dbMakerJPN = SimpleEnglishSentencesJsonDbMaker("http://english-writing.mobi/workbook/question.php?theme_no=", 1, 79)
    # dbMakerJPN.startScraping().saveDbAsJson("../TextDB/SimpleEnglishSentencesJsonDb_JPN")
    # dbMakerENG = SimpleEnglishSentencesJsonDbMaker("http://english-writing.mobi/workbook/answer.php?theme_no=", 1, 79)
    # dbMakerENG.startScraping().saveDbAsJson("../TextDB/SimpleEnglishSentencesJsonDb_ENG")

    app = SimpleEnglishSentencesJsonDbMakerForGogakuru("https://gogakuru.com/english/phrase/genre/120_ボキャブラリー.html?perPage=10&pageID=", 1, 422)
    app.startScraping().saveDbAsJson("./GokakuruGrammarFeatureDb")
