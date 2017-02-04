Wafse_client.Renderer.LoginAndCoreateAccount = function(_appBody, _appDataManager){
    
    'use strict';
    
    const defaultHtml_mainNav = $('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainNav').html();
    const defaultHtml_mainContainer = $('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainContainer').html();
    
    let self, renderAll, renderMainNav, renderMainContainer, appBody, appDataManager,
        mainNav = Wafse_client.Activator.LoginAndCoreateAccount.MainNav,
        mainContainer = Wafse_client.Activator.LoginAndCoreateAccount.MainContainer,
        mainNavInstance, mainContainerInstance
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    renderMainNav = function(callback){
        // NOTE: Create Wafse_client.PageController.LoginAndCoreateAccount.MainNav if add dom action to mainNav.
        //       Refer Wafse_client.PageController.LoginAndCoreateAccount.MainContainer.
        appBody.appendRender(defaultHtml_mainNav, function(){
            mainNavInstance = mainNav(appBody, self, appDataManager);
            if (callback) callback();
        });
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    renderMainContainer = function(callback){
        
        // if get htmlTemplate from index.html
        appBody.appendRender(defaultHtml_mainContainer, function(){
            mainContainerInstance = mainContainer(appBody, mainNavInstance, self, appDataManager).activateAll();
            if (callback) callback();        
        });

        // if get htmlTemplate from server
        /*
        $.ajax({
            url: "/htmlTemplates/LoginAndCoreateAccount.html",
            cache: false,
            success: function(defaultHtml_mainContainer){
                appBody.appendRender(defaultHtml_mainContainer, function(){
                    mainContainerInstance = mainContainer(appBody, mainNavInstance, self, appDataManager).activateAll();
                    if (callback) callback();        
                });
            }
        });
        */
        
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