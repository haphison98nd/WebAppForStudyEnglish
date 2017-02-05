Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
        
    const defaultHtml_mainContainer = $($('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainContainer').html());

    let self, appBody, appNavigation, appDrawer, appDataManager, changePage, root, loginAndCoreateAccount;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        appBody.clearPage();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function (callback) {
        let mainContainer = Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer(appBody, appNavigation, appDrawer, appDataManager, self);
        // appDrawer.hiddeDrawerButton();
        appBody.clearPage();
        appBody.appendRender(mainContainer.jQeryObj, function(){
            if (callback) callback();        
        });
        // debug
        // setTimeout(function(){ mainContainer.remove(); }, 5000);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        appDataManager = _appDataManager;
        appBody = _appBody;
        appNavigation = _appNavigation;
        appDrawer = _appDrawer;
        $(window).on('beforeunload', function(e) {
            appDataManager.save();
            return '';
        });
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {'/':root, '/login-and-coreate-account':loginAndCoreateAccount};
    return self;
};