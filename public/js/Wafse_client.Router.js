Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
        
    let self, appBody, appNavigation, appDrawer, appDataManager, changePage, root, loginAndCoreateAccount;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        appBody.clearPage();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        appBody.clearPage();
        appDrawer.hiddeDrawerButton();
        Wafse_client.Renderer.LoginAndCoreateAccount(appBody, appNavigation, appDrawer, appDataManager, self).renderAll();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    changePage = function (url) {

        const stringUrl = String(url);
        
        switch (stringUrl) {
            case '/' :
                root();
                break;
            case '/login-and-coreate-account' :
                loginAndCoreateAccount();
                break;
            default :
                throw new Error (stringUrl + " doesn't define in Wafse_client.Router");
                break;
        }
        return self;
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
    
    self = {changePage:changePage};
    return self;
};