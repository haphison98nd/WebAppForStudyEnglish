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
                appDrawer.clearPage().closeDrawer();
                loginAndCoreateAccount();
            });
            appDrawer.appendRender(mdlNavigationLink.jQeryObj);
        }
        appDrawer.openDrawer();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textSelectMenu = function () {
        
        let ajaxSuccessAction;
        
        ajaxSuccessAction = function (textListJson) {
            let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, self, 'mainContainerMiddle', '学べるテキスト');
            
            for (let titleText in textListJson){
                const isButtonClickable = titleText === 'To Be Announced' ? false : true;
                let mdlSquareCardOption = {
                        titleText:titleText,
                        supportingText:textListJson[titleText]['snippet'],
                        backGroundImageUrl:textListJson[titleText]['backGroundImageUrl'],
                        buttonClickAction:function(ss){ dummy(); },
                        isButtonClickable:isButtonClickable
                    },
                    mdlSquareCard = Wafse_client.ComponentCreator.MdlSquareCard(appDrawer, appNavigation, appDataManager, self, mdlSquareCardOption);
                mainContainerMiddle.appendRender(mdlSquareCard.jQeryObj);
            }
            
            history.pushState('#textSelectMenu', 'textSelectMenu', '#textSelectMenu');
            appDrawer.clearPage().hiddenDrawerButton().closeDrawer();
            appBody.clearPage().appendRender(mainContainerMiddle.jQeryObj); 
        };
        
        $.ajax({
          url: '/textList',
          cache: false,
          success: function(textListJson){
             ajaxSuccessAction(textListJson);
          }
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        let mainContainerSmall = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, self, 'mainContainerSmall', 'ようこそ'),
            loginAndCoreateAccountForm = Wafse_client.ComponentCreator.LoginAndCoreateAccountForm(appNavigation, appDataManager, self, mainContainerSmall)
        ;        
        mainContainerSmall.appendRender(loginAndCoreateAccountForm.jQeryObj);
        history.pushState('#login-and-create-account', 'login-and-create-account', '#login-and-create-account');
        appDrawer.clearPage().hiddenDrawerButton().closeDrawer();
        appBody.clearPage().appendRender(mainContainerSmall.jQeryObj);
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