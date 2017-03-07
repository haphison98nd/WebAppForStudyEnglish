Wafse_client.ComponentCreator.MdlNavigationLink = function(_appDrawer, _appDataManager, _router, _text, _callback){
    
    'use strict';
    
    const mdlNavigationLink = $($('.htmlTemplate.mdlNavigationLink').clone().html()).find('.mdl-navigation__link');
    
    let self,
        appDrawer, appDataManager, router, text, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function setMdlNavigationLinkText (str) {
        mdlNavigationLink.text(str);
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function activateMdlNavigationLink (__callback) {
        mdlNavigationLink.click(function(){
            __callback(self);
            // debug
            // remove();
        });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function remove () {
        mdlNavigationLink.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDrawer = _appDrawer;
        appDataManager = _appDataManager;
        router = _router;
        text = _text;
        callback = _callback;

        if (callback) activateMdlNavigationLink(callback);
        setMdlNavigationLinkText(text);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQueryObj:mdlNavigationLink, remove:remove};
    return self;
};