const SortGogakuruDb = function(_filePathOfGogakuruDb){
    
    'use strict';
    
    const extendedFs = require('./ExtendedFs.js');

    let sortedDb = {}, 
        self,
        filePathOfGogakuruDb
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function getJsonDbAsObj () {
        return sortedDb;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function saveJsonDbAsJson (fileName, callback) {
        extendedFs.writeFile(fileName + '.json', JSON.stringify(sortedDb, null, 4), function(err){
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

    // private
    function addPartNameKeyIntoSortedDb (gogakuruDb) {
        for (let partName in gogakuruDb) { sortedDb[partName] = {}; }
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function startSorting (gogakuruDb) {
        addPartNameKeyIntoSortedDb(gogakuruDb);
        for (let partName in gogakuruDb) { 
            for (let pageIdx = 1; pageIdx <= Object.keys(gogakuruDb[partName]).length; pageIdx++){
                sortedDb[partName]['Page ' + String(pageIdx)] = gogakuruDb[partName]['Page ' + String(pageIdx)];
            }
        }
    }

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
    let app = SortGogakuruDb('../public/textDB/Gogakuru/' + String(process.argv[2]));
    app.saveJsonDbAsJson('../public/textDB/Gogakuru/' + String(process.argv[2]));
})();