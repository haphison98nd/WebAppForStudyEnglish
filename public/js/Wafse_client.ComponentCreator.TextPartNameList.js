Wafse_client.ComponentCreator.TextPartNameList = function(_appDataManager, _router, _textPartNameList, _postQuery, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle'),
        self,
        appDataManager, router, textPartNameList, postQuery, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
        
    // private
    function conbineComponents (__textPartNameList, __postQuery) {
        const bootStrapTable = Wafse_client.ComponentCreator.BootStrapTable();
        bootStrapTable.appendThead(['章の名前', 'ステータス', '周回回数']);
        for (let textPartName of __textPartNameList){
            bootStrapTable.appendTbody([textPartName, '---', '---'], function(){
                history.pushState(null, null, '#text-page-name-list');
                router['#text-page-name-list']({'titleText':postQuery.titleText, 'textPartName':textPartName});
            });
        }
        mainContainerMiddle.appendRender(bootStrapTable.jQueryObj);
    }
        
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        mainContainerMiddle.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;
        router = _router;
        textPartNameList = _textPartNameList;
        postQuery = _postQuery;
        callback = _callback;
        
        mainContainerMiddle.setNavigator([['#text-select-menu', 'ホーム'], ['#text-part-name-list', postQuery.titleText]]);
        conbineComponents(textPartNameList, postQuery);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = { jQueryObj:mainContainerMiddle.jQueryObj, remove:remove };
    return self;
};