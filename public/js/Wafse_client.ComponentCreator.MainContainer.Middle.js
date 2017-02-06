Wafse_client.ComponentCreator.MainContainer.Middle = function(_appDrawer, _appNavigation, _appDataManager, _router,  _mainMassageText, _callback){
    
    'use strict';
    
    const htmlTemplate_mainContainerMiddle = $($('.htmlTemplate#htmlTemplate_mainContainerMiddle').clone().html()),
          mainContainerMiddle = htmlTemplate_mainContainerMiddle,
          mainMassage = htmlTemplate_mainContainerMiddle.find('#mainMassage')
    ;
    
    let self, appendRender, activateAll, setMainMassage, remove,
        appDrawer, appNavigation, appDataManager, router, mainMassageText, callback
    ;
    

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, callback){
        mainContainerMiddle.append(jQueryObj).ready(function(){ 
            if (callback) callback(self); 
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMainMassage = function (text) {
        mainMassage.text(String(text));
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
        mainMassage.text(String(mainMassageText));
        mainMassage.click(function(){
            if(callback) callback(self);
            // router['#login-and-create-account']();
            // remove();
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mainContainerMiddle.remove();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDrawer = _appDrawer;
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;
        mainMassageText = _mainMassageText;
        callback = _callback;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_mainContainerMiddle, appendRender:appendRender, setMainMassage:setMainMassage, remove:remove};
    return self;
};