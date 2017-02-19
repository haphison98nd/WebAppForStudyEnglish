module.exports = function (_filePathesAndNames) {

    'use strict';
    
    const extendedFs   = require('./ExtendedFs.js') || require('./myNodeModules/ExtendedFs.js');
    
    let self, 
        textDbs = {},
        loadDataBases, extractDbNameFromFilePath, getTextPartNameList, getTextPageNameList, getPageContents,
        filePathesAndNames, dbNamesJPN
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    // change './TextDB/SyunkanEisakubun/SyunkanEisakubunDb.json' to 'SyunkanEisakubunDb'
    extractDbNameFromFilePath = function (filePath){
        let dbName =  filePath.split('/');
        dbName = dbName[dbName.length-1].split('.')[0];
        return String(dbName);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    // @param { array } __filePathesAndNames: foramt... [['fileName', 'pathForDb'], ['fileName', 'pathForDb']]
    loadDataBases = function(__filePathesAndNames){
        for (let idx in __filePathesAndNames) {
            textDbs[String(__filePathesAndNames[idx][0])] = JSON.parse(extendedFs.readFileSync(__filePathesAndNames[idx][1], 'utf-8'));
        }
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    getTextPartNameList = function (dbName) {
        let textPartNameList = [];
        for (let textPartName in textDbs[String(dbName)]){
            textPartNameList.push(textPartName);
        }
        return textPartNameList;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    getTextPageNameList = function (dbName, partName) {
        let textPageNameList = [],
            partContents = textDbs[String(dbName)][partName]
        ;
        for (let textPageName in partContents){
            textPageNameList.push(textPageName);
        }
        return textPageNameList;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    getPageContents = function (dbName, partName, pageName) {
        return textDbs[String(dbName)][partName][pageName];
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        filePathesAndNames = _filePathesAndNames;
        loadDataBases(filePathesAndNames);
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