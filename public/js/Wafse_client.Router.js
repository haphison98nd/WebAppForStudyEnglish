Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, appBody, appNavigation, appDrawer, appDataManager, changePage, root, loginAndCoreateAccount;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        appBody.clearPage();
        appDrawer.showDrawerButton();
        for (let idx = 1; idx <= 10; idx++){
            let mdlNavigationLink = Wafse_client.ComponentCreator.MdlNavigationLink(appDrawer, appDataManager, self, 'Button ' + idx, function(){
                console.log(appDataManager.getItem('LoginAndCoreateAccount.userName') + ' ' + idx);
                appDrawer.clearDrawerList();
                appDrawer.closeDrawer();
            });
            appDrawer.addDrawerList(mdlNavigationLink.jQeryObj);
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        let mainContainer = Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer(appNavigation, appDataManager, self);
        // appDrawer.hiddeDrawerButton();
        appBody.clearPage();
        appDrawer.hiddenDrawerButton();
        appBody.appendRender(mainContainer.jQeryObj);
        // debug
        /*
        setTimeout(function(){ 
            mainContainer.remove();
            setTimeout(function(){ 
                mainContainer = Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer(appNavigation, appDataManager, self);
                appBody.appendRender(mainContainer.jQeryObj, function(){
                    if (callback) callback();        
                });   
            }, 2000);
        }, 2000);
        */
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