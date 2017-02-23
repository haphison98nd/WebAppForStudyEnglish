Wafse_client.Activator.AppBody = function(_appDataManager){
    
    'use strict';

    const appBody = $('#appBody');
    
    let self, appendRender, afterRender, clearPage, scrollTo,
        appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, __callback){
        appBody.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });    
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    afterRender = function(jQueryObj, callback){
        appBody.after(jQueryObj).ready(function(){ 
            if (callback) callback(self); 
        });  
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    clearPage = function(){
        appBody.empty();
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    scrollTo = function (scrollTop, spped) {
        spped = spped ? spped : 0;
        appBody.animate({scrollTop:scrollTop}, spped, 'swing');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { appendRender:appendRender, afterRender:afterRender, clearPage:clearPage, scrollTo:scrollTo };
    return self;
};