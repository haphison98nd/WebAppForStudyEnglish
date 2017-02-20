Wafse_client.ComponentCreator.MarkDownWindow = function(_markDownFileName,  _readMeMarkDown, _callback){

    'use strict';
    
    let mainContainerMiddle,
        htmlTemplate_markDownWindow = $($('.htmlTemplate#markDownWindow').clone().html()),
        markDownContainer = htmlTemplate_markDownWindow.find('#markDownContainer'),
        self, remove, conbineComponents, 
        markDownFileName, readMeMarkDown, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    conbineComponents = function (__readMeMarkDown) {
        markDownContainer.append(marked(__readMeMarkDown));
        mainContainerMiddle.appendRender(markDownContainer);
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
        mainContainerMiddle.setNavigator([['#text-select-menu', 'テキストを選択'], ['#read-me' , markDownFileName]]);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:mainContainerMiddle.jQeryObj, remove:remove};
    return self;
};