Wafse_client.ComponentCreator.MdlSquareCard = function(_appDrawer, _appNavigation, _appDataManager, _router,  _mdlCardTitleText, _mdlCardSupportingText, _callback){
    
    'use strict';
    
    const htmlTemplate_mdlSquareCard = $($('.htmlTemplate#htmlTemplate_mdlSquareCard').clone().html()),
          mdlSquareCard = htmlTemplate_mdlSquareCard,
          mdlCardTitle = htmlTemplate_mdlSquareCard.find('.mdl-card__title-text'),
          mdlCardSupporting = htmlTemplate_mdlSquareCard.find('.mdl-card__supporting-text'),
          mdlButton = htmlTemplate_mdlSquareCard.find('.mdl-button')
    ;
    
    let self, appendRender, activateAll, setMdlCardTitleText, setMdlCardSupportingText, remove,
        appDrawer, appNavigation, appDataManager, router, mdlCardTitleText, mdlCardSupportingText, callback
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
    
    setMdlCardTitleText = function (text) {
        mdlCardTitle.text(String(text));
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMdlCardSupportingText = function (text) {
        mdlCardSupporting.text(String(text));
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
        setMdlCardTitleText(mdlCardTitleText);
        setMdlCardSupportingText(mdlCardSupportingText);
        mdlButton.click(function(){
            if(callback) callback(self);
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mdlSquareCard.remove();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDrawer = _appDrawer;
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;
        mdlCardTitleText = _mdlCardTitleText;
        mdlCardSupportingText = _mdlCardSupportingText;
        callback = _callback;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_mdlSquareCard, appendRender:appendRender, remove:remove};
    return self;
};