Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, dummy, textSelectMenu, loginAndCoreateAccount, start,
        appBody, appNavigation, appDrawer, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    dummy = function () {
        history.pushState('#dummy', 'dummy', '#dummy');
        appBody.clearPage();
        appDrawer.clearPage();
        appDrawer.showDrawerButton();
        for (let idx = 1; idx <= 100; idx++){
            let mdlNavigationLink = Wafse_client.ComponentCreator.MdlNavigationLink(appDrawer, appDataManager, self, 'Button ' + idx, function(s){
                console.log(appDataManager.getItem('LoginAndCoreateAccount.userName') + ' ' + idx);
                appDrawer.clearPage();
                appDrawer.closeDrawer();
                textSelectMenu();
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

    textSelectMenu = function () {
        let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer.Middle(appDrawer, appNavigation, appDataManager, self, '学べるテキスト', function (s) {

            let title = 'どんどん話すための瞬間英作文トレーニング ',
                inst = '中学レベルの文型で正確にスピーディーに英文を作る能力を身につけられます ';
                        
            for (let idx = 1; idx <= 100; idx++){
                let mdlSquareCard = Wafse_client.ComponentCreator.MdlSquareCard(appDrawer, appNavigation, appDataManager, self, title + idx, inst + idx, function(ss){
                    // ss.remove();
                    loginAndCoreateAccount();
                });
                s.appendRender(mdlSquareCard.jQeryObj);
            }

            s.setMainMassage('OK');
            
            // debug
            /*
            appNavigation.showProgressSpinner();
            setTimeout(function(){
                loginAndCoreateAccount();
                appNavigation.hiddenProgressSpinner();
            }, 3000);
            */
        });
        
        history.pushState('#textSelectMenu', 'textSelectMenu', '#textSelectMenu');
        appBody.clearPage();
        appDrawer.clearPage();
        appDrawer.hiddenDrawerButton();
        appDrawer.closeDrawer();
        appBody.appendRender(mainContainerMiddle.jQeryObj);
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
    
    self = {start:start, '#textSelectMenu':textSelectMenu, '#login-and-create-account':loginAndCoreateAccount, '#dummy':dummy};
    return self;
};