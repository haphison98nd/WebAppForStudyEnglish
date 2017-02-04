Wafse_client.Renderer.LoginAndCoreateAccount = function(_appBody, _appDataManager){
    
    'use strict';
    
    const defaultHtml_mainNav = $('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainNav').html(),
          defaultHtml_mainContainer = $('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainContainer').html(),
          mainContainerActivator = Wafse_client.Activator.LoginAndCoreateAccount.MainContainer
    ;
    
    let self, renderAll, renderMainNav, renderMainContainer, appBody, appDataManager;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    renderMainNav = function(){
        // NOTE: Create Wafse_client.PageController.LoginAndCoreateAccount.MainNav if add dom action to mainNav.
        //       Refer Wafse_client.PageController.LoginAndCoreateAccount.MainContainer.
        appBody.appendRender(defaultHtml_mainNav);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    renderMainContainer = function(){
        appBody.appendRender(defaultHtml_mainContainer, function(){
            mainContainerActivator(appBody, self, appDataManager).activateAll();
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    renderAll = function(){
        renderMainNav();
        renderMainContainer();
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appBody = _appBody;
        appDataManager = _appDataManager;
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {renderAll:renderAll, renderMainNav:renderMainNav, renderMainContainer:renderMainContainer};
    return self;
};