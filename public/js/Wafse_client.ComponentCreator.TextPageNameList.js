Wafse_client.ComponentCreator.TextPageNameList = function(_appDataManager, _router, _textPageNameList, _postQuery, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle'),
        self,
        appDataManager, router, textPageNameList, postQuery, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
        
    // private
    function conbineComponents (__textPageNameList, __postQuery) {
        const bootStrapTable = Wafse_client.ComponentCreator.BootStrapTable();    
        bootStrapTable.appendThead(['節の名前', 'ステータス', 'クリア回数', '最短クリア時間']);
        for (let textPageName of __textPageNameList){
            bootStrapTable.appendTbody([textPageName, '---', '---', '---'], function(){
                history.pushState(null, null, '#question-form');
                router['#question-form']({'titleText':__postQuery.titleText, 'textPartName':__postQuery.textPartName, 'textPageName':textPageName});
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
        textPageNameList = _textPageNameList;
        postQuery = _postQuery;
        callback = _callback;
        
        conbineComponents(textPageNameList, postQuery);
        mainContainerMiddle.setNavigator([['#text-select-menu', 'ホーム'], ['#text-part-name-list', postQuery.titleText], ['#text-page-name-list', postQuery.textPartName]]);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = { jQueryObj:mainContainerMiddle.jQueryObj, remove:remove };
    return self;
};