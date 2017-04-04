module.exports = function (_filePathesAndNamesList) {

    'use strict';
    
    const extendedFs   = require('./ExtendedFs.js') || require('./myNodeModules/ExtendedFs.js');
    
    let self, 
        textDbs = {},
        filePathesAndNamesList
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    // change './TextDB/SyunkanEisakubun/SyunkanEisakubunDb.json' to 'SyunkanEisakubunDb'
    function extractDbNameFromFilePath (filePath) {
        let dbName =  filePath.split('/');
        dbName = dbName[dbName.length-1].split('.')[0];
        return String(dbName);
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    // @param { array } __filePathesAndNamesList: foramt... [['fileName', 'pathToDb'], ['fileName', 'pathToDb']]
    function loadDataBases (__filePathesAndNamesList) {
        for (let idx in __filePathesAndNamesList) {
            textDbs[String(__filePathesAndNamesList[idx][0])] = JSON.parse(extendedFs.readFileSync(__filePathesAndNamesList[idx][1], 'utf-8'));
        }
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function getTextPartNameList (dbName) {
        let textPartNameList = [];
        for (let textPartName in textDbs[String(dbName)]){
            textPartNameList.push(textPartName);
        }
        return textPartNameList;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function getTextPageNameList (dbName, partName) {
        let textPageNameList = [],
            partContents = textDbs[String(dbName)][partName]
        ;
        for (let textPageName in partContents){
            textPageNameList.push(textPageName);
        }
        return textPageNameList;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function getPageContents (dbName, partName, pageName) {
        return textDbs[String(dbName)][partName][pageName];
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        filePathesAndNamesList = _filePathesAndNamesList;
        loadDataBases(filePathesAndNamesList);
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
    const app = require('./TextDbController.js')([
        ['どんどん話すための瞬間英作文トレーニング', '../TextDB/SyunkanEisakubun/SyunkanEisakubunDb.json']
    ]);
    console.log(app.getTextPartNameList('どんどん話すための瞬間英作文トレーニング'));
    console.log(app.getTextPageNameList('どんどん話すための瞬間英作文トレーニング', 'Part1 中学1年レベル'));
    console.log(app.getPageContents('どんどん話すための瞬間英作文トレーニング', 'Part3 中学3年レベル', '原型不定詞・使役'));
})();
*/