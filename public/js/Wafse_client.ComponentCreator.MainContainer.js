Wafse_client.ComponentCreator.MainContainer = function(_mainContainerSize, _mainMassageText, _callback){
    
    'use strict';
    
    const htmlTemplate_mainContainer = $($('.htmlTemplate#mainContainer').clone().html()),
          mainContainer = htmlTemplate_mainContainer,
          mainMassage = htmlTemplate_mainContainer.find('#mainMassage')
    ;
    
    let self, appendRender, activateMainContainerSize, activateMainMessage, activateAll, setNavigator, remove,
        mainContainerSize, mainMassageText, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, __callback){
        mainContainer.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
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
        setNavigator(mainMassageText);
        // Memoriy Leak Test
        // setTimeout(function(){ mainMassage.click(); }, 1000);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mainContainer.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        mainContainerSize = _mainContainerSize;
        mainMassageText = _mainMassageText;
        callback = _callback;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_mainContainer, appendRender:appendRender, setNavigator:setNavigator, remove:remove};
    return self;
};