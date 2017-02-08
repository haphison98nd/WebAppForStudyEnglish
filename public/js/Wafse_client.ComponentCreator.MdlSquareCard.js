Wafse_client.ComponentCreator.MdlSquareCard = function(_appDrawer, _appNavigation, _appDataManager, _router, _option){
    
    'use strict';
    
    const htmlTemplate_mdlSquareCard = $($('.htmlTemplate#htmlTemplate_mdlSquareCard').clone().html()),
          mdlSquareCard = htmlTemplate_mdlSquareCard,
          mdlCardTitle = htmlTemplate_mdlSquareCard.find('.mdl-card__title-text'),
          mdlCardImgeArea = htmlTemplate_mdlSquareCard.find('.mdl-card__title.mdl-card--expand'),
          mdlCardSupporting = htmlTemplate_mdlSquareCard.find('.mdl-card__supporting-text'),
          mdlButton = htmlTemplate_mdlSquareCard.find('.mdl-button')
    ;
    
    let self, appendRender, activateAll, 
        setMdlCardBackGroundImage, setMdlCardTitleText, setMdlCardSupportingText, setButtonMode, remove,
        appDrawer, appNavigation, appDataManager, router, option
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, __callback){
        mainContainerMiddle.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMdlCardTitleText = function (text) {
        mdlCardTitle.text(String(text));
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMdlCardSupportingText = function (text) {
        mdlCardSupporting.text(String(text));
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    setMdlCardBackGroundImage = function (backGroundImageUrl) {
        mdlCardImgeArea.css({'background':"url('" + String(backGroundImageUrl) + "') no-repeat"});
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setButtonMode = function (isButtonClickable) {
        if (isButtonClickable === false) mdlButton.remove();
        // if (isButtonClickable === false) mdlButton.prop('disabled', false);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
        setMdlCardTitleText(option.titleText);
        setMdlCardSupportingText(option.supportingText);
        setMdlCardBackGroundImage(option.backGroundImageUrl);
        setButtonMode(option.isButtonClickable);
        mdlButton.click(function(){
            if(option.buttonClickAction) option.buttonClickAction(self);
        });
        // Memoriy Leak Test
        // setTimeout(function(){ mdlButton.click(); }, 2000);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mdlSquareCard.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDrawer = _appDrawer;
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;
        option = _option;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {    
             jQeryObj:htmlTemplate_mdlSquareCard, appendRender:appendRender, remove:remove,
             setMdlCardTitleText:setMdlCardTitleText, setMdlCardSupportingText:setMdlCardSupportingText, 
             setMdlCardBackGroundImage:setMdlCardBackGroundImage
    };
    return self;
};