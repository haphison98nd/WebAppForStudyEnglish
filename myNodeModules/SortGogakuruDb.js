const SortGogakuruDb = function(_filePathOfGogakuruDb){
    
    'use strict';
    
    const extendedFs = require('./ExtendedFs.js');

    let sortedDb = {}, 
        self, startSorting, saveJsonDbAsJson, getJsonDbAsObj,
        filePathOfGogakuruDb
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    getJsonDbAsObj = function () {
        return sortedDb;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    saveJsonDbAsJson = function(fileName, callback){
        extendedFs.writeFile(fileName + '.json', JSON.stringify(sortedDb, null, 4), function(err){
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

    // private
    startSorting = function (gogakuruDb) {
        for (let partName in gogakuruDb) { sortedDb[partName] = {}; }
        for (let partName in gogakuruDb) { 
            for (let pageIdx = 1; pageIdx <= Object.keys(gogakuruDb[partName]).length; pageIdx++){
                sortedDb[partName]['Page ' + String(pageIdx)] = gogakuruDb[partName]['Page ' + String(pageIdx)];
            }
        }
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){        
        filePathOfGogakuruDb = _filePathOfGogakuruDb;
        let gogakuruDb = JSON.parse(extendedFs.readFileSync(filePathOfGogakuruDb, 'utf-8'));
        startSorting(gogakuruDb);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {getJsonDbAsObj:getJsonDbAsObj, saveJsonDbAsJson:saveJsonDbAsJson};
    return self;
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    let app = SortGogakuruDb('../TextDB/Gogakuru/HighSchoolLebelDb.json');
    app.saveJsonDbAsJson('../TextDB/Gogakuru/HighSchoolLebelDb');
})();