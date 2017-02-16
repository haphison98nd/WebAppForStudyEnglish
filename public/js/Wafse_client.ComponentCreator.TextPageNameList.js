Wafse_client.ComponentCreator.TextPageNameList = function(_appDataManager, _router, _textPageNameList, _postQuery, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle', '節を選択'),
        self, conbineComponents, activateAll, remove,
        appDataManager, router, textPageNameList, postQuery, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
        
    // private
    conbineComponents = function () {
        const bootStrapTable = Wafse_client.ComponentCreator.BootStrapTable();    
        bootStrapTable.appendThead(['節の名前', 'ステータス', 'クリア回数', '最短クリア時間']);
        for (let textPageName of textPageNameList){
            bootStrapTable.appendTbody([textPageName, '近日実装', '近日実装', '近日実装'], function(){
                router['#questionForm']({'titleText':postQuery.titleText, 'textPageName':textPageName});
            });
        }
        mainContainerMiddle.appendRender(bootStrapTable.jQeryObj);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateAll = function(){
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
        textPageNameList = _textPageNameList;
        postQuery = _postQuery;
        callback = _callback;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:mainContainerMiddle.jQeryObj, remove:remove};
    return self;
};