Wafse_client.ComponentCreator.TextSelectMenu = function(_appDataManager, _router, _textList, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle'),
        self, conbineComponents, remove,
        appDataManager, router, textList, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    conbineComponents = function (__appDataManager, __router, __textList) {
        for (let titleText in __textList){
            let mdlSquareCardOption = {
                    titleText:titleText,
                    supportingText:__textList[titleText]['snippet'],
                    backGroundImageUrl:__textList[titleText]['backGroundImageUrl'],
                    buttonText:'勉強する',
                    buttonClickAction:function(s){ 
                        history.pushState(null, null, '#text-part-name-list');              
                        router['#text-part-name-list']({'titleText':titleText}); 
                    },
                    isButtonClickable:titleText === 'To Be Announced' ? false : true
                },
                mdlSquareCard = Wafse_client.ComponentCreator.MdlSquareCard(__appDataManager, __router, mdlSquareCardOption);
            mainContainerMiddle.appendRender(mdlSquareCard.jQeryObj);
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    remove = function () {
        mainContainerMiddle.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDataManager = _appDataManager;
        router = _router;
        textList = _textList;
        callback = _callback;
        
        mainContainerMiddle.setNavigator([['#text-select-menu', 'テキストを選択']]);
        conbineComponents(appDataManager, router, textList);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:mainContainerMiddle.jQeryObj, remove:remove};
    return self;
};