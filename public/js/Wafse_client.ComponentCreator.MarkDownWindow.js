Wafse_client.ComponentCreator.MarkDownWindow = function(_markDownFileName,  _readMeMarkDown, _callback){

    'use strict';
    
    let mainContainerMiddle,
        markDownWindow = $($('.htmlTemplate.markDownWindow').clone().html()).find('#markDownWindow'),
        self, remove, conbineComponents, 
        markDownFileName, readMeMarkDown, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    conbineComponents = function (__readMeMarkDown) {
        markDownWindow.append(marked(__readMeMarkDown));
        mainContainerMiddle.appendRender(markDownWindow);
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
        callback = _callback;
        markDownFileName = _markDownFileName;
        readMeMarkDown = _readMeMarkDown;
        mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerSmallMiddle', String(markDownFileName));
        conbineComponents(readMeMarkDown);
        mainContainerMiddle.setNavigator([['#text-select-menu', 'ホーム'], ['#read-me', markDownFileName]]);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQueryObj:mainContainerMiddle.jQueryObj, remove:remove};
    return self;
};