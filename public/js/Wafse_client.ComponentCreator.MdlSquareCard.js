Wafse_client.ComponentCreator.MdlSquareCard = function(_appDataManager, _router, _option){
    
    'use strict';
    
    const mdlSquareCard = $($('.htmlTemplate.mdlSquareCard').clone().html()).find('#mdlSquareCard'),
          mdlCardTitle = mdlSquareCard.find('.mdl-card__title-text'),
          mdlCardImgeArea = mdlSquareCard.find('.mdl-card__title.mdl-card--expand'),
          mdlCardSupporting = mdlSquareCard.find('.mdl-card__supporting-text'),
          button = mdlSquareCard.find('.btn')
    ;
    
    let self, 
        appDataManager, router, option
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function setMdlCardTitleText (text) {
        mdlCardTitle.text(String(text));
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function setMdlCardSupportingText (text) {
        mdlCardSupporting.text(String(text));
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function setMdlCardBackGroundImage (backGroundImageUrl) {
        mdlCardImgeArea.css({'background':"url('" + String(backGroundImageUrl) + "') no-repeat"});
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function setButtonMode (isButtonClickable) {
        if (isButtonClickable === false) button.remove();
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function setButtonText (buttonText) {
        button.text(String(buttonText));
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    function activateButton (__callback) {
        button.click(__callback);
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        mdlSquareCard.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
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
    
    self = { jQueryObj:mdlSquareCard, remove:remove };
    return self;
};