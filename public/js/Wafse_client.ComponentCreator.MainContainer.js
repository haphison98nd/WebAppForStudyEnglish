Wafse_client.ComponentCreator.MainContainer = function(_mainContainerSize, _mainMassageText){
    
    'use strict';
    
    const mainContainer = $($('.htmlTemplate.mainContainer').clone().html()).find('#mainContainer'),
          mainMassage = mainContainer.find('#mainMassage')
    ;
    
    let self,
        mainContainerSize, mainMassageText
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function appendRender (jQueryObj, __callback) {
        mainContainer.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function setNavigator (navigatorContents) {
        mainMassage.empty();
        if (typeof navigatorContents === 'object'){
            for (let idx in navigatorContents) {
                const mdlChip = $($('.htmlTemplate.navigationChip').clone().html()).find('.mdl-chip'),
                      mdlChipInnerTextArea = mdlChip.find('.mdl-chip__text')
                ;
                mdlChip.attr('href', navigatorContents[idx][0]);
                mdlChipInnerTextArea.text(navigatorContents[idx][1]);
                mainMassage.append(mdlChip);
                if (idx < navigatorContents.length - 1) mainMassage.append('>');
            }
        } else if (typeof navigatorContents === 'string') {
            mainMassage.text(String(navigatorContents));
        }
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function activateMainContainerSize (text) {
        mainContainer.addClass(String(text));
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        mainContainer.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        mainContainerSize = _mainContainerSize;
        mainMassageText = _mainMassageText;
        
        activateMainContainerSize(mainContainerSize);
        setNavigator(mainMassageText);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = { jQueryObj:mainContainer, appendRender:appendRender, setNavigator:setNavigator, remove:remove };
    return self;
};