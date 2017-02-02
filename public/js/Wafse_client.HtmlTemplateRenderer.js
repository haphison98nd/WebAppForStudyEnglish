Wafse_client.HtmlTemplateRenderer = function(){
    
    'use strict';

    const appBody= $('#appBody');
    
    let self, render, addRender, remove, clearPage;

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

    addRender = function(target, htmlTemplate, callback){
        target.append(htmlTemplate).ready(function(){ 
            if (callback) callback(); 
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function(target){
        target.remove();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    clearPage = function(htmlTemplate){
        appBody.empty();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = {render:render, addRender:addRender, remove:remove, clearPage:clearPage};
    return self;
};