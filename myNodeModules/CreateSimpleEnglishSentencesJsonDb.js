const CreateSimpleEnglishSentencesJsonDb = function(_filePathOfSimpleEnglishSentencesJsonDb_JPN, _filePathOfSimpleEnglishSentencesJsonDb_ENG){
    
    'use strict';
    
    const extendedFs = require('./ExtendedFs.js'),
          partListOfShunkanEisakubun = {
              'Part1 中学1年レベル':{start:1, end:23},
              'Part2 中学2年レベル':{start:24, end:57},
              'Part3 中学3年レベル':{start:58, end:79}              
          }
    ;

    let jsonDb_JPN    = null, 
        jsonDb_ENG    = null,
        simpleEnglishSentencesJsonDb = {  
            'Part1 中学1年レベル':{},
            'Part2 中学2年レベル':{},
            'Part3 中学3年レベル':{}
        },
        self, getPageNumber, getPageTitle, getPageTextOfJpnAngEng, 
        createSimpleEnglishSentencesJsonDb, saveSimpleEnglishSentencesJsonDbAsJson, getSimpleEnglishSentencesJsonDbAsObj,
        filePathOfSimpleEnglishSentencesJsonDb_JPN, filePathOfSimpleEnglishSentencesJsonDb_ENG
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    getPageNumber = function (stringPageName) {  
        let splitedStringPageName = stringPageName.split('-');
        return parseInt(splitedStringPageName[1], 10);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    getPageTitle = function (pageNumber) {
        let pageTitle = jsonDb_JPN['page-' + pageNumber]['title'];
        pageTitle = pageTitle.split(' ');
        pageTitle.splice(pageTitle.length-1,1);
        pageTitle = pageTitle.join(' ');
        return pageTitle;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    getPageTextOfJpnAngEng = function (pageName) {
        return {
                 'JPN':jsonDb_JPN[pageName]['text'],
                 'ENG':jsonDb_ENG[pageName]['text']
                }
        ;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    createSimpleEnglishSentencesJsonDb = function () {
        for (let pageName in jsonDb_JPN) {
            let pageNumber = getPageNumber(pageName);
            if (pageNumber >= partListOfShunkanEisakubun['Part1 中学1年レベル'].start && pageNumber <= partListOfShunkanEisakubun['Part1 中学1年レベル'].end) {
                simpleEnglishSentencesJsonDb['Part1 中学1年レベル'][getPageTitle(pageNumber)] = getPageTextOfJpnAngEng(pageName);
            } else if (pageNumber >= partListOfShunkanEisakubun['Part2 中学2年レベル'].start && pageNumber <= partListOfShunkanEisakubun['Part2 中学2年レベル'].end) {
                simpleEnglishSentencesJsonDb['Part2 中学2年レベル'][getPageTitle(pageNumber)] = getPageTextOfJpnAngEng(pageName);
            } else {
                simpleEnglishSentencesJsonDb['Part3 中学3年レベル'][getPageTitle(pageNumber)] = getPageTextOfJpnAngEng(pageName);
            }
        }
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    getSimpleEnglishSentencesJsonDbAsObj = function () {
        return simpleEnglishSentencesJsonDb;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    saveSimpleEnglishSentencesJsonDbAsJson = function(fileName, callback){
        // How to write indented JSON using JavaScript?: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript  
        extendedFs.writeFile(fileName + '.json', JSON.stringify(simpleEnglishSentencesJsonDb, null, 4), function(err){
           if(err){
               console.log('Faired: saving ' + fileName + '.json');
           }else{
               console.log('Success: saving ' + fileName + '.json');
               if(callback) callback();
           }
        });
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor (){
        filePathOfSimpleEnglishSentencesJsonDb_JPN = _filePathOfSimpleEnglishSentencesJsonDb_JPN;
        filePathOfSimpleEnglishSentencesJsonDb_ENG = _filePathOfSimpleEnglishSentencesJsonDb_ENG;        
        jsonDb_JPN = JSON.parse(extendedFs.readFileSync(filePathOfSimpleEnglishSentencesJsonDb_JPN, 'utf-8'));
        jsonDb_ENG = JSON.parse(extendedFs.readFileSync(filePathOfSimpleEnglishSentencesJsonDb_ENG, 'utf-8'));
                
        // debug code of getPageTitle
        // console.log(getPageTitle(11));
        // debug code of getPageNumber
        // for ( let pageName in jsonDb_ENG ) console.log(getPageNumber(pageName));

    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {
             createSimpleEnglishSentencesJsonDb:createSimpleEnglishSentencesJsonDb,
             getSimpleEnglishSentencesJsonDbAsObj:getSimpleEnglishSentencesJsonDbAsObj,
             saveSimpleEnglishSentencesJsonDbAsJson:saveSimpleEnglishSentencesJsonDbAsJson 
           }
    ;
    return self;
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    let app = CreateSimpleEnglishSentencesJsonDb('../TextDB/SyunkanEisakubun/SimpleEnglishSentencesJsonDb_JPN.json', '../TextDB/SyunkanEisakubun/SimpleEnglishSentencesJsonDb_ENG.json');
    app.createSimpleEnglishSentencesJsonDb().saveSimpleEnglishSentencesJsonDbAsJson('../TextDB/SyunkanEisakubun/SyunkanEisakubunDb');
})();