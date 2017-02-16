Wafse_client.ComponentCreator.TextSelectMenu = function(_appDataManager, _router, _textList, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle'),
        self, conbineComponents, activateAll, remove,
        appDataManager, router, textList, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    conbineComponents = function () {
        for (let titleText in textList){
            let mdlSquareCardOption = {
                    titleText:titleText,
                    supportingText:textList[titleText]['snippet'],
                    backGroundImageUrl:textList[titleText]['backGroundImageUrl'],
                    buttonText:'勉強する',
                    buttonClickAction:function(s){ 
                        history.pushState(null, null, '#textPartNameList');              
                        router['#textPartNameList']({'titleText':titleText}); 
                    },
                    isButtonClickable:titleText === 'To Be Announced' ? false : true
                },
                mdlSquareCard = Wafse_client.ComponentCreator.MdlSquareCard(appDataManager, router, mdlSquareCardOption);
            mainContainerMiddle.appendRender(mdlSquareCard.jQeryObj);
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateAll = function(){
        mainContainerMiddle.setNavigator([['#textSelectMenu', 'テキストを選択']]);
        conbineComponents();
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
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:mainContainerMiddle.jQeryObj, remove:remove};
    return self;
};