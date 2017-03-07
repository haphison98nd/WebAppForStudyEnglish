const CreateTitleListDbFromSimpleEnglishSentencesJsonDb = function(_filePath){
    
    'use strict';
    
    const extendedFs = require('./ExtendedFs.js');

    let jsonDb    = null, 
        titleList = {},
        self,
        filePath
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    function createTitleList () {
        for (let pageIdx = 1; pageIdx <= Object.keys(jsonDb).length; pageIdx++){
            // console.log(jsonDb['page-' + pageIdx]);
            titleList[jsonDb['page-' + pageIdx]['title']] = 'page-' + pageIdx;
        }
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function getDb () {
        return jsonDb;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function getTitleListAsObj () {
        return titleList;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    function saveTitleListAsJson (fileName, callback) {
        // How to write indented JSON using JavaScript?: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript  
        extendedFs.writeFile(fileName + '.json', JSON.stringify(titleList, null, 4), function(err){
           if(err){
               console.log('Faired: saving ' + fileName + '.json');
           }else{
               console.log('Success: saving ' + fileName + '.json');
               if(callback) callback();
           }
        });
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor (){
        filePath = _filePath;
        jsonDb = JSON.parse(extendedFs.readFileSync(filePath, 'utf-8'));
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { createTitleList:createTitleList, getTitleListAsObj:getTitleListAsObj, getDb:getDb, saveTitleListAsJson:saveTitleListAsJson };
    return self;
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    let app_JPN = CreateTitleListDbFromSimpleEnglishSentencesJsonDb('../TextDB/SimpleEnglishSentencesJsonDb_JPN.json'),
        app_ENG = CreateTitleListDbFromSimpleEnglishSentencesJsonDb('../TextDB/SimpleEnglishSentencesJsonDb_ENG.json')
    ;
    app_JPN.createTitleList().saveTitleListAsJson('../TextDB/TitleList_SimpleEnglishSentencesJsonDb_JPN');
    app_ENG.createTitleList().saveTitleListAsJson('../TextDB/TitleList_SimpleEnglishSentencesJsonDb_ENG');
})();