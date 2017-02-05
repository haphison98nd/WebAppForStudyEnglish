Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, root, loginAndCoreateAccount,
        appBody, appNavigation, appDrawer, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        appBody.clearPage();
        appDrawer.clearPage();
        appDrawer.showDrawerButton();
        for (let idx = 1; idx <= 10; idx++){
            let mdlNavigationLink = Wafse_client.ComponentCreator.MdlNavigationLink(appDrawer, appDataManager, self, 'Button ' + idx, function(){
                console.log(appDataManager.getItem('LoginAndCoreateAccount.userName') + ' ' + idx);
                appDrawer.clearPage();
                appDrawer.closeDrawer();
            });
            appDrawer.appendRender(mdlNavigationLink.jQeryObj);
            
            // debug
            // let mainContainer = Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer(appNavigation, appDataManager, self);
            // appDrawer.appendRender(mainContainer.jQeryObj);
        }
        appDrawer.openDrawer();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        let mainContainer = Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer(appNavigation, appDataManager, self);
        // appDrawer.hiddeDrawerButton();
        appBody.clearPage();
        appDrawer.clearPage();
        appDrawer.hiddenDrawerButton();
        appBody.appendRender(mainContainer.jQeryObj);
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