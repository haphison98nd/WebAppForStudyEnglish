Wafse_client.Activator.Root.AppBody = function(_appDataManager){
    
    'use strict';

    const appBody = $('#appBody'), progressSpinner = $('#progressSpinner');
    
    let self, appDataManager, appendRender, afterRender, clearPage, showProgressSpinner, hiddenProgressSpinner;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(html, callback){
        appBody.append(html).ready(function(){ 
            if (callback) callback(); 
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    afterRender = function(html, callback){
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

    showProgressSpinner = function () {
        progressSpinner.css({'display':'inline'});
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    hiddenProgressSpinner = function () {
        progressSpinner.css({'display':'none'});
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {
            appendRender:appendRender, afterRender:afterRender, clearPage:clearPage, 
            showProgressSpinner:showProgressSpinner, hiddenProgressSpinner:hiddenProgressSpinner
    };
    return self;
};