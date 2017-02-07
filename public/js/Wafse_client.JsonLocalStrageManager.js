Wafse_client.JsonLocalStrageManager = function (_object4LocalStrageName, _object4LocalStrage, _protectedKeys) {
    
    'use strict'; 
    
    let self, load, save, setItem, getItem, keyParser, addKey, deleteKey, print, searchObjectKey, isKeyProtected,
        object4LocalStrage, object4LocalStrageName, protectedKeys
    ;
    
    // TODO: imprement addKey, deleteKey method.
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    load = function(isRefresh){
        if(isRefresh || localStorage.getItem(object4LocalStrageName) === null || localStorage.getItem(object4LocalStrageName) === undefined){
            if(isRefresh){
                console.info('Refreshed ' + object4LocalStrageName +' is loaded.');
            } else {
                console.warn(object4LocalStrageName + 'is not exist in localStrage.');
                console.warn(object4LocalStrageName + 'template is loaded.');
            }
        } else {
            console.info(object4LocalStrageName + ' is loaded.');
            object4LocalStrage = JSON.parse(localStorage.getItem(object4LocalStrageName));
        }
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    save = function(){
        localStorage.setItem(object4LocalStrageName, JSON.stringify(object4LocalStrage, null, 4));
        console.info(object4LocalStrageName + ' saved.');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    keyParser = function(stringKeys){
        return String(stringKeys).split('.');
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    isKeyProtected = function(stringKeys){
        return protectedKeys.indexOf(stringKeys) === -1 ? false : true;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    searchObjectKey = function(keys){
        let searchObjectKeyLoop,
            searchObjectKeyLoopCount = 0,
            innerObjKey = null,
            innerObjValue = null
        ;

        (function searchObjectKeyLoop (obj, _keys, loopIdx) {
            const _isKeyExist = obj.hasOwnProperty(_keys[loopIdx]);            

            if(_isKeyExist){
                innerObjKey = obj;
                innerObjValue = obj[_keys[loopIdx]];
                searchObjectKeyLoopCount++
                searchObjectKeyLoop(innerObjValue, _keys, searchObjectKeyLoopCount);
            } else {
                return 0;
            }
        })(object4LocalStrage, keys, searchObjectKeyLoopCount);
        
        
        return { isKeyExist:searchObjectKeyLoopCount === keys.length ? true : false,
                 targetKey:innerObjKey,
                 targetValue:innerObjValue
               }
        ;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // this method protect object4LocalStrage from extendation of object4LocalStrage.
    // if we set data to no exit key in object4LocalStrage, 
    // this method thorow Error.
    // if we set value to object4LocalStrage's new key, we should add key to app data template.
    // see line 6.
    // Also we can't set data to protected key. 
    // @param key {stringKeys}. Key of object4LocalStrage object. e.g... 'LoginAndCoreateAccount.userName'
    // @param value {any}. Data for setting object4LocalStrage.
    setItem = function(stringKeys, value){
        const keys = keyParser(stringKeys);
        let result = searchObjectKey(keys);
        if(isKeyProtected(stringKeys)){
            throw new Error ('Key ' + stringKeys + " is protected. Check third argment of JsonLocalStrageManager.");
        } else if (result.isKeyExist){
            result.targetKey[keys[keys.length - 1]] = value;
            return self;
        } else {
            throw new Error ('Key ' + stringKeys + ' does not exist in ' + object4LocalStrageName +'. Check first argment of JsonLocalStrageManager.');
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getItem = function(stringKeys){
        const keys = keyParser(stringKeys);
        let result = searchObjectKey(keys);

        if(result.isKeyExist){
            return result.targetValue;
        } else {
            console.warn('Key ' + stringKeys + ' does not exist in ' + object4LocalStrageName +'.');
            return undefined;
        }        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    addKey = function () {

    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    deleteKey = function () {
        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    print = function(){
        console.log(object4LocalStrage);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        object4LocalStrageName = String(_object4LocalStrageName);
        object4LocalStrage = _object4LocalStrage;
        protectedKeys = _protectedKeys;
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {load:load, save:save, setItem:setItem, getItem:getItem, print:print};
    return self;
};
