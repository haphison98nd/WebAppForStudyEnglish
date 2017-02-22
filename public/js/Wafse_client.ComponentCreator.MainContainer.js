Wafse_client.ComponentCreator.MainContainer = function(_mainContainerSize, _mainMassageText){
    
    'use strict';
    
    const mainContainer = $($('.htmlTemplate.mainContainer').clone().html()).find('#mainContainer'),
          mainMassage = mainContainer.find('#mainMassage')
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
        mainMassage.empty();
        if (typeof navigatorContents === 'object'){
            for (let idx in navigatorContents) {
                const mdlChip = $($('.htmlTemplate.navigationChip').clone().html()).find('.mdl-chip'),
                      mdlChipInnerTextArea = mdlChip.find('.mdl-chip__text')
                ;
                mdlChip.attr('href', navigatorContents[idx][0]);
                mdlChipInnerTextArea.text(navigatorContents[idx][1]);
                mainMassage.append(mdlChip);
                if (idx < navigatorContents.length-1) mainMassage.append('>');
            }
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
    
    self = {jQeryObj:mainContainer, appendRender:appendRender, setNavigator:setNavigator, remove:remove};
    return self;
};