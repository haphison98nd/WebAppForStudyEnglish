const CreateTitleListDbFromSimpleEnglishSentencesJsonDb = function(){
    
    'use strict';
    
    const extendedFs = require('./ExtendedFs.js');

    let jsonDb    = null, 
        titleList = {},
        self, constructor, createTitleList, getTitleList, getDb, saveTitleListAsJson;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    createTitleList = function(){
        for (let pageIdx = 1; pageIdx < 80; pageIdx++){
            // console.log(jsonDb['page-' + pageIdx]);
            titleList[jsonDb['page-' + pageIdx]['title']] = 'page-' + pageIdx;
        }
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getDb = function(){
        return jsonDb;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getTitleList = function(){
        createTitleList();
        return titleList;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    saveTitleListAsJson = function(fileName, callback){
        // How to write indented JSON using JavaScript?: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript  
        extendedFs.writeFile(fileName + '.json', JSON.stringify(titleList, null, 4), function(err){
           if(err){
               console.log('Faired: saving ' + fileName + '.json');
           }else{
               console.log('Success: saving ' + fileName + '.json');
               if(callback) callback();
           }
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    constructor = function (filePath){
        jsonDb = extendedFs.readFileSync(filePath, 'utf-8');
        jsonDb = JSON.parse(jsonDb);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self  = {constructor:constructor, createTitleList:createTitleList, getTitleList:getTitleList, getDb:getDb, saveTitleListAsJson:saveTitleListAsJson};    
    return self;
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    let app_JPN = CreateTitleListDbFromSimpleEnglishSentencesJsonDb(),
        app_ENG = CreateTitleListDbFromSimpleEnglishSentencesJsonDb()
    ;
    app_JPN.constructor('../TextDB/SimpleEnglishSentencesJsonDb_JPN.json').createTitleList().saveTitleListAsJson('../TextDB/TitleList_SimpleEnglishSentencesJsonDb_JPN');
    app_ENG.constructor('../TextDB/SimpleEnglishSentencesJsonDb_ENG.json').createTitleList().saveTitleListAsJson('../TextDB/TitleList_SimpleEnglishSentencesJsonDb_ENG');
})();