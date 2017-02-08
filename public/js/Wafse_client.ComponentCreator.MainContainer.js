Wafse_client.ComponentCreator.MainContainer = function(_appDrawer, _appNavigation, _appDataManager, _router, _mainContainerSize, _mainMassageText, _callback){
    
    'use strict';
    
    const htmlTemplate_mainContainer = $($('.htmlTemplate#htmlTemplate_mainContainer').clone().html()),
          mainContainer = htmlTemplate_mainContainer,
          mainMassage = htmlTemplate_mainContainer.find('#mainMassage')
    ;
    
    let self, appendRender, activateMainContainerSize, activateMainMessage, activateAll, setMainMassage, remove,
        appDrawer, appNavigation, appDataManager, router, mainContainerSize, mainMassageText, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, __callback){
        mainContainer.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMainMassage = function (text) {
        mainMassage.text(String(text));
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateMainMessage = function () {
        mainMassage.click(function(){
            if(callback) callback(self);
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    activateMainContainerSize = function () {
        mainContainer.addClass(String(mainContainerSize));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
        activateMainContainerSize();
        activateMainMessage();
        setMainMassage(mainMassageText);
        // Memoriy Leak Test
        // setTimeout(function(){ mainMassage.click(); }, 1000);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mainContainer.remove();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDrawer = _appDrawer;
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;
        mainContainerSize = _mainContainerSize;
        mainMassageText = _mainMassageText;
        callback = _callback;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_mainContainer, appendRender:appendRender, setMainMassage:setMainMassage, remove:remove};
    return self;
};