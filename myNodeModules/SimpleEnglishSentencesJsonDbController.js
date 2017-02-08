module.exports = function (_filePath) {

    'use strict';
    
    const extendedFs   = require('./ExtendedFs.js') || require('./myNodeModules/ExtendedFs.js');
    
    let self, simpleEnglishSentencesJsonDb,
        loadDataBase, getTextPartNameList, getTextPageNameList, getPageContents,
        filePath
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    loadDataBase = function(){
        simpleEnglishSentencesJsonDb = JSON.parse(extendedFs.readFileSync(filePath, 'utf-8'));
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getTextPartNameList = function () {
        let textPartNameList = [];
        for (let textPartName in simpleEnglishSentencesJsonDb){
            textPartNameList.push(textPartName);
        }
        return textPartNameList;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getTextPageNameList = function (partName) {
        let textPageNameList = [],
            partContents = simpleEnglishSentencesJsonDb[partName]
        ;
        for (let textPageName in partContents){
            textPageNameList.push(textPageName);
        }
        return textPageNameList;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getPageContents = function (requestedTextPageName) {
        let pageContentObj = null;
        for (let partName in simpleEnglishSentencesJsonDb){
            for (let textPageName in simpleEnglishSentencesJsonDb[partName]){
                if (String(requestedTextPageName) === textPageName) {
                    pageContentObj = simpleEnglishSentencesJsonDb[partName][textPageName];
                    break;
                }
            }
        }
        return pageContentObj;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////


    (function constructor (){
        filePath = _filePath;
        loadDataBase();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { getTextPartNameList:getTextPartNameList, getTextPageNameList:getTextPageNameList, getPageContents:getPageContents };
    return self;
}; 

//////////////////////////////////////////////
//////////////////////////////////////////////

/*
(function moduleTest(){
    const app = require('./SimpleEnglishSentencesJsonDbController.js')('../TextDB/SyunkanEisakubun/SimpleEnglishSentencesJsonDb.json');
    // console.log(app.getTextPartNameList());
    // console.log(app.getTextPageNameList('Part1 中学1年レベル'));
    // console.log(app.getPageContents('原型不定詞・使役'));
})();
*/