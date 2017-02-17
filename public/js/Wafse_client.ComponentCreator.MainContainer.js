Wafse_client.ComponentCreator.MainContainer = function(_mainContainerSize, _mainMassageText){
    
    'use strict';
    
    const htmlTemplate_mainContainer = $($('.htmlTemplate#mainContainer').clone().html()),
          mainContainer = htmlTemplate_mainContainer,
          mainMassage = htmlTemplate_mainContainer.find('#mainMassage')
    ;
    
    let self, appendRender, activateMainContainerSize, setNavigator, remove,
        mainContainerSize, mainMassageText
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    appendRender = function(jQueryObj, __callback){
        mainContainer.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    setNavigator = function (navigatorContents) {
        if (typeof navigatorContents === 'object'){
            let navigatorHtml = '';
            for (let navigatorContent of navigatorContents) {
                navigatorHtml += '<a class="mdl-chip" href="' + navigatorContent[0] + '"><span class="mdl-chip__text">' + navigatorContent[1] + '</span></a> >';
            }
            // remove extra '>' from navigatorHtml.
            navigatorHtml = navigatorHtml.substr(0, navigatorHtml.length-1);
            mainMassage.html(navigatorHtml);
        } else if (typeof navigatorContents === 'string') {
            mainMassage.text(String(navigatorContents));
        }
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    activateMainContainerSize = function (text) {
        mainContainer.addClass(String(text));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    remove = function () {
        mainContainer.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        mainContainerSize = _mainContainerSize;
        mainMassageText = _mainMassageText;
        
        activateMainContainerSize(mainContainerSize);
        setNavigator(mainMassageText);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_mainContainer, appendRender:appendRender, setNavigator:setNavigator, remove:remove};
    return self;
};