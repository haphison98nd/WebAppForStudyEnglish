# -*- coding: utf-8 -*-

from SimpleEnglishSentencesJsonDbMaker import *
from SimpleEnglishSentencesJsonDbMakerForGogakuru import *

######################################################
######################################################

if __name__ == '__main__':
    # dbMakerJPN = SimpleEnglishSentencesJsonDbMaker("http://english-writing.mobi/workbook/question.php?theme_no=", 1, 79)
    # dbMakerJPN.startScraping().saveDbAsJson("../public/textDB/SimpleEnglishSentencesJsonDb_JPN")
    # dbMakerENG = SimpleEnglishSentencesJsonDbMaker("http://english-writing.mobi/workbook/answer.php?theme_no=", 1, 79)
    # dbMakerENG.startScraping().saveDbAsJson("../public/textDB/SimpleEnglishSentencesJsonDb_ENG")
    # https://gogakuru.com/chinese/phrase/tag_cloud/132_%E3%81%82%E3%81%84%E3%81%95%E3%81%A4.html?pageID=1

    app = SimpleEnglishSentencesJsonDbMakerForGogakuru("https://gogakuru.com/english/phrase/genre/10_英語の基礎.html?perPage=10&pageID=", 1, 555)
    app.startScraping().saveDbAsJson("../public/textDB/Gogakuru/FundamentalLevelDb")

    # app = SimpleEnglishSentencesJsonDbMakerForGogakuru("https://gogakuru.com/chinese/phrase/genre/index.html?pageID=", 1, 217)
    # app.startScraping().saveDbAsJson("../public/textDB/Gogakuru/Chinese/ChineseGreetingDb")
