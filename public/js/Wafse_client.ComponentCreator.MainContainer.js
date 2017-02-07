Wafse_client.ComponentCreator.MainContainer = function(_appDrawer, _appNavigation, _appDataManager, _router, _mainContainerSize, _mainMassageText, _callback){
    
    'use strict';
    
    const htmlTemplate_mainContainer = $($('.htmlTemplate#htmlTemplate_mainContainer').clone().html()),
          mainContainer = htmlTemplate_mainContainer,
          mainMassage = htmlTemplate_mainContainer.find('#mainMassage')
    ;
    
    let self, appendRender, setMainContainerSize, activateMainMessage, activateAll, setMainMassage, remove,
        appDrawer, appNavigation, appDataManager, router, mainContainerSize, mainMassageText, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, _callback){
        mainContainer.append(jQueryObj).ready(function(){ 
            if (_callback) _callback(self); 
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMainMassage = function (text) {
        mainMassage.text(String(text));
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateMainMessage = function (_callback) {
        mainMassage.click(function(){
            if(_callback) _callback(self);
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMainContainerSize = function (__mainContainerSize) {
        mainContainer.addClass(String(__mainContainerSize));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
        setMainContainerSize(mainContainerSize);
        activateMainMessage(callback);
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