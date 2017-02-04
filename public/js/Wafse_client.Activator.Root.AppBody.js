Wafse_client.Activator.Root.AppBody = function(_appDataManager){
    
    'use strict';

    const appBody = $('#appBody');
    
    let self, appDataManager, appendRender, afterRender, clearPage;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(html, callback){
        appBody.append(html).ready(function(){ 
            if (callback) callback(); 
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    afterRender = function(target, html, callback){
        appBody.after(html).ready(function(){ 
            if (callback) callback(); 
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    clearPage = function(html){
        appBody.empty();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {appendRender:appendRender, afterRender:afterRender, clearPage:clearPage};
    return self;
};