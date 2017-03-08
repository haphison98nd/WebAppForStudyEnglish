Wafse_client.JsonLocalStrageManager = function (_object4LocalStrageName, _object4LocalStrage, _protectedKeys) {
    
    'use strict'; 
    
    let self,
        object4LocalStrage, object4LocalStrageName, protectedKeys
    ;
    
    // TODO: imprement deleteKey method.
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function load (isRefresh) {
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
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function save () {
        localStorage.setItem(object4LocalStrageName, JSON.stringify(object4LocalStrage, null, 4));
        console.info(object4LocalStrageName + ' saved.');
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function keyParser (stringKeys) {
        return String(stringKeys).split('.');
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function isKeyProtected (stringKeys) {
        return protectedKeys.indexOf(stringKeys) === -1 ? false : true;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function searchObjectKey (keys) {
        let searchObjectKeyLoop,
            searchObjectKeyLoopCount = 0,
            innerObjKey = null,
            innerObjValue = null,
            isKeyExistLogUntillLastKey = false,
            isKeyExistLogs = [],
            isKeyExistCount = 0
        ;        
        (function searchObjectKeyLoop (obj, _keys, loopIdx) {
            try {
                const _isKeyExist = obj.hasOwnProperty(_keys[loopIdx]);
                isKeyExistLogs.push(_isKeyExist);
                if(_isKeyExist){
                    innerObjKey = obj;
                    innerObjValue = obj[_keys[loopIdx]];
                    searchObjectKeyLoopCount++;
                    searchObjectKeyLoop(innerObjValue, _keys, searchObjectKeyLoopCount);
                } else {
                    return 0;
                }
            } catch (e) {
                return 0;
            }
        })(object4LocalStrage, keys, searchObjectKeyLoopCount);
        for (let isKeyExistLog of isKeyExistLogs) {
            if (isKeyExistLog) isKeyExistCount++;
        }
        if (isKeyExistCount === keys.length-1 || isKeyExistCount === keys.length) isKeyExistLogUntillLastKey = true;
        return { isKeyExistLogUntillLastKey:isKeyExistLogUntillLastKey, // this is used when add new key to strage using setItem
                 isKeyExistCount:isKeyExistCount, // this is used for 
                 isKeyExist:searchObjectKeyLoopCount === keys.length ? true : false,
                 targetKey:innerObjKey, // keys which has same hierarchy as keys[keys.length-1]
                 targetValue:innerObjValue // value which is child element of keys[keys.length-1]
               }
        ;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    // this method protect object4LocalStrage from extendation of object4LocalStrage.
    // if we set data to no exit key in object4LocalStrage, 
    // this method thorows Error.
    // Also we can't set data to protected key.
    // @param key {stringKeys}: Key of object4LocalStrage object. e.g... 'LoginAndCoreateAccount.userName'
    // @param value {any}: Data for setting object4LocalStrage.
    function setItem (stringKeys, value) {
        const keys = keyParser(stringKeys);
        let result = searchObjectKey(keys);
        if(isKeyProtected(stringKeys)){
            throw new Error ('Key ' + stringKeys + " is protected. Check third argment of JsonLocalStrageManager.");
        } else if (result.isKeyExist){
            result.targetKey[keys[keys.length - 1]] = value;
            return self;
        } else {
            if (result.isKeyExistLogUntillLastKey) {
                result.targetValue[keys[keys.length - 1]] = value;
                return self;
            } else {
                let notExistKeys = '';
                for (let idx = 0; idx <= result.isKeyExistCount; idx++) {
                    if (idx !== result.isKeyExistCount){
                        notExistKeys += keys[idx] + '.';
                    } else {
                        notExistKeys += keys[idx];
                    }
                }
                throw new Error ('Key ' + notExistKeys + ' does not exist in ' + object4LocalStrageName +'. Check first argment of JsonLocalStrageManager.');
            }
        }
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function getItem (stringKeys) {
        const keys = keyParser(stringKeys);
        let result = searchObjectKey(keys);

        if(result.isKeyExist){
            return result.targetValue;
        } else {
            console.warn('Key ' + stringKeys + ' does not exist in ' + object4LocalStrageName +'.');
            return undefined;
        }        
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function deleteKey () {
        
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function print () {
        console.log(object4LocalStrage);
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        object4LocalStrageName = String(_object4LocalStrageName);
        object4LocalStrage = _object4LocalStrage;
        protectedKeys = _protectedKeys;
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { load:load, save:save, setItem:setItem, getItem:getItem, deleteKey:deleteKey, print:print };
    return self;
};
