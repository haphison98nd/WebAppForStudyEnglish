const CreateSimpleEnglishSentencesJsonDb = function(_filePathOfSimpleEnglishSentencesJsonDb_JPN, _filePathOfSimpleEnglishSentencesJsonDb_ENG){
    
    'use strict';
    
    const extendedFs = require('./ExtendedFs.js');

    let jsonDb_JPN    = null, 
        jsonDb_ENG    = null,
        simpleEnglishSentencesJsonDb = {  
            'Part1 中学1年レベル':{},
            'Part2 中学2年レベル':{},
            'Part3 中学3年レベル':{}
        },
        self,
        filePathOfSimpleEnglishSentencesJsonDb_JPN, filePathOfSimpleEnglishSentencesJsonDb_ENG
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function getPageNumber (stringPageName) {  
        let splitedStringPageName = stringPageName.split('-');
        return parseInt(splitedStringPageName[1], 10);
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function getScrapedPageName (__jsonDb_JPN, pageNumber) {
        let pageTitle = __jsonDb_JPN['page-' + pageNumber]['title'];
        pageTitle = pageTitle.split(' ');
        pageTitle.splice(pageTitle.length-1,1);
        pageTitle = pageTitle.join(' ');
        return pageTitle;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function getPageTextOfJpnAngEng (__jsonDb_JPN, __jsonDb_ENG, pageName) {
        return {
                 'JPN':__jsonDb_JPN[pageName]['text'],
                 'ENG':__jsonDb_ENG[pageName]['text']
                }
        ;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function createSimpleEnglishSentencesJsonDb () {
        const partListOfShunkanEisakubun = {
            'Part1 中学1年レベル':{start:1, end:23},
            'Part2 中学2年レベル':{start:24, end:57},
            'Part3 中学3年レベル':{start:58, end:79}              
        };
        for (let pageName in jsonDb_JPN) {
            let pageNumber = getPageNumber(pageName),
                scrapedPageName = getScrapedPageName(jsonDb_JPN, pageNumber),
                pageTextOfJpnAngEng = getPageTextOfJpnAngEng(jsonDb_JPN, jsonDb_ENG, pageName)
            ;
            if (pageNumber >= partListOfShunkanEisakubun['Part1 中学1年レベル'].start && pageNumber <= partListOfShunkanEisakubun['Part1 中学1年レベル'].end) {
                simpleEnglishSentencesJsonDb['Part1 中学1年レベル'][scrapedPageName] = pageTextOfJpnAngEng;
            } else if (pageNumber >= partListOfShunkanEisakubun['Part2 中学2年レベル'].start && pageNumber <= partListOfShunkanEisakubun['Part2 中学2年レベル'].end) {
                simpleEnglishSentencesJsonDb['Part2 中学2年レベル'][scrapedPageName] = pageTextOfJpnAngEng;
            } else {
                simpleEnglishSentencesJsonDb['Part3 中学3年レベル'][scrapedPageName] = pageTextOfJpnAngEng;
            }
        }
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function getSimpleEnglishSentencesJsonDbAsObj () {
        return simpleEnglishSentencesJsonDb;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function saveSimpleEnglishSentencesJsonDbAsJson (fileName, callback) {
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
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor (){
        filePathOfSimpleEnglishSentencesJsonDb_JPN = _filePathOfSimpleEnglishSentencesJsonDb_JPN;
        filePathOfSimpleEnglishSentencesJsonDb_ENG = _filePathOfSimpleEnglishSentencesJsonDb_ENG;        
        jsonDb_JPN = JSON.parse(extendedFs.readFileSync(filePathOfSimpleEnglishSentencesJsonDb_JPN, 'utf-8'));
        jsonDb_ENG = JSON.parse(extendedFs.readFileSync(filePathOfSimpleEnglishSentencesJsonDb_ENG, 'utf-8'));
                
        // debug code of getScrapedPageName
        // console.log(getScrapedPageName(11));
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