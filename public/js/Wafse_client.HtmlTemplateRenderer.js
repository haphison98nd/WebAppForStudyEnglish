Wafse_client.HtmlTemplateRenderer = function(){
    
    'use strict';

    const appBody= $('#appBody');
    
    let self, render, clearPage;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    render = function(htmlTemplate, callback){
        clearPage();
        appBody.append(htmlTemplate).ready(function(){ 
            if (callback) callback(); 
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    clearPage = function(htmlTemplate){
        appBody.empty();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {render:render, clearPage:clearPage};
    return self;
};