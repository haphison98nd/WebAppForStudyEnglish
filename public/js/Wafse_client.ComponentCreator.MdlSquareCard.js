Wafse_client.ComponentCreator.MdlSquareCard = function(_appDataManager, _router, _option){
    
    'use strict';
    
    const mdlSquareCard = $($('.htmlTemplate.mdlSquareCard').clone().html()).find('#mdlSquareCard'),
          mdlCardTitle = mdlSquareCard.find('.mdl-card__title-text'),
          mdlCardImgeArea = mdlSquareCard.find('.mdl-card__title.mdl-card--expand'),
          mdlCardSupporting = mdlSquareCard.find('.mdl-card__supporting-text'),
          button = mdlSquareCard.find('.btn')
    ;
    
    let self, appendRender, setMdlCardBackGroundImage, setMdlCardTitleText, 
        setMdlCardSupportingText, setButtonMode, setButtonText, activateButton, remove,
        appDataManager, router, option
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    appendRender = function(jQueryObj, __callback){
        mainContainerMiddle.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    setMdlCardTitleText = function (text) {
        mdlCardTitle.text(String(text));
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    setMdlCardSupportingText = function (text) {
        mdlCardSupporting.text(String(text));
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    setMdlCardBackGroundImage = function (backGroundImageUrl) {
        mdlCardImgeArea.css({'background':"url('" + String(backGroundImageUrl) + "') no-repeat"});
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    setButtonMode = function (isButtonClickable) {
        if (isButtonClickable === false) button.remove();
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    setButtonText = function(buttonText) {
        button.text(String(buttonText));
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    activateButton = function(__callback){
        button.click(__callback);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    remove = function () {
        mdlSquareCard.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDataManager = _appDataManager;
        router = _router;
        option = _option;

        setMdlCardTitleText(option.titleText);
        setMdlCardSupportingText(option.supportingText);
        setMdlCardBackGroundImage(option.backGroundImageUrl);
        setButtonMode(option.isButtonClickable);
        setButtonText(option.buttonText);
        if (option.buttonClickAction) activateButton(option.buttonClickAction);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = { jQeryObj:mdlSquareCard, appendRender:appendRender, remove:remove };
    return self;
};