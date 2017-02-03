Wafse_client.AppDataManager = function () {
    
    'use strict'; 
    
    let self, load, save, setItem, getItem, keyParser, print, searchObjectKey, isKeyProtected,
        appData = {
            LoginAndCoreateAccount:{
                userName:'fun',
                userPassword:'fun'            
            }
        },
        protectedKey = ['LoginAndCoreateAccount']
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    load = function(isRefresh){
        if(isRefresh || localStorage.getItem('appData') === null || localStorage.getItem('appData') === undefined){
            if(isRefresh){
                console.info('Refreshed appData is loaded.');
            } else {
                console.warn('appData is not exist in localStrage.');
                console.warn('template appData loaded.');
            }
        } else {
            appData = JSON.parse(localStorage.getItem('appData'));
        }
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    save = function(){
        localStorage.setItem('appData', JSON.stringify(appData, null, 4));
        console.info('appData saved.');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    keyParser = function(stringKeys){
        return String(stringKeys).split('.');
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    isKeyProtected = function(keys){
        return protectedKey.indexOf(keys[keys.length-1]) === -1 ? false : true;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    searchObjectKey = function(_appData, keys){
        let searchObjectKeyLoop,
            searchObjectKeyLoopCount = 0,
            innerObjKey = null,
            innerObjValue = null
        ;
        
        console.log(_appData);

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
        })(_appData, keys, searchObjectKeyLoopCount);
        
        
        return { isKeyExist:searchObjectKeyLoopCount === keys.length ? true : false,
                 targetKey:innerObjKey,
                 targetValue:innerObjValue
               }
        ;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // this method protect appData from extendation of appData.
    // if we set data to no exit key in appData, 
    // this method thorow Error.
    // if we set value to appData' new key, we should add key to app data template.
    // see line 6.
    // Also we can't set data to protected key. 
    // @param key {stringKeys}. Key of appData object. e.g... 'LoginAndCoreateAccount.userName'
    // @param value {any}. Data for setting appData.
    setItem = function(stringKeys, value){
        const keys = keyParser(stringKeys);
        let result = searchObjectKey(appData, keys);
                
        if(isKeyProtected(keys)){
            throw new Error ('Key ' + stringKeys + " is protected. See appData template (Wafse_client.AppDataManage: 12).");
        } else if (result.isKeyExist){
            result.targetKey[keys[keys.length - 1]] = value;
            return self;
        } else {
            throw new Error ('Key ' + stringKeys + " does not exist in appData. See appData template (Wafse_client.AppDataManage: 6).");
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getItem = function(stringKeys){
        const keys = keyParser(stringKeys);
        let result = searchObjectKey(appData, keys);

        if(result.isKeyExist){
            return result.targetValue;
        } else {
            console.warn('Key ' + stringKeys + " does not exist in appData. See appData template (Wafse_client.AppDataManage: 6).");
            return undefined;
        }        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    print = function(){
        console.log(appData);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {load:load, save:save, setItem:setItem, getItem:getItem, print:print};
    return self;
};
