Wafse_client.Activator.AppBody = function(_appDataManager){
    
    'use strict';

    const appBody = $('#appBody');
    
    let self, appDataManager, appendRender, afterRender, clearPage;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, callback){
        appBody.append(jQueryObj).ready(function(){ 
            if (callback) callback(); 
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    afterRender = function(jQueryObj, callback){
        appBody.after(jQueryObj).ready(function(){ 
            if (callback) callback(); 
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    clearPage = function(){
        appBody.empty();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { appendRender:appendRender, afterRender:afterRender, clearPage:clearPage };
    return self;
};