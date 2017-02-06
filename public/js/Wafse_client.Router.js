Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, root, loginAndCoreateAccount, start,
        appBody, appNavigation, appDrawer, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        history.pushState('#root', 'root', '#root');
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
        history.pushState('#login-and-create-account', 'login-and-create-account', '#login-and-create-account');
        appBody.clearPage();
        appDrawer.clearPage();
        appDrawer.hiddenDrawerButton();
        appDrawer.closeDrawer();
        appBody.appendRender(mainContainer.jQeryObj);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    start = function () {
        console.log('location.hash: ' + location.hash);
        if(location.hash === '' || location.hash === null || location.hash === undefined){ 
            self['#login-and-create-account']();
        } else {
            try {
                self[location.hash]();
            } catch (e){
                self['#login-and-create-account']();
            }
        }
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
        
        $(window).on('popstate', function(event){
            console.log('event.originalEvent.state: ' + event.originalEvent.state);
            try {
                self[event.originalEvent.state]();
            } catch (e) {
                console.log(e);
            }
        });
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {start:start, '#root':root, '#login-and-create-account':loginAndCoreateAccount, '/':loginAndCoreateAccount};
    return self;
};