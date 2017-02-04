Wafse_client.Router = function (_appBody, _appDataManager) {

    'use strict';
        
    let self, appBody, appDataManager, changePage, root, loginAndCoreateAccount;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        appBody.clearPage();
        Wafse_client.Renderer.LoginAndCoreateAccount(appBody, appDataManager, self).renderMainNav();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function (router) {
        Wafse_client.Renderer.LoginAndCoreateAccount(appBody, appDataManager, self).renderAll();
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