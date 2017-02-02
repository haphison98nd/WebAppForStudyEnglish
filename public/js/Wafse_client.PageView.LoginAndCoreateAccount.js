Wafse_client.PageView.LoginAndCoreateAccount = function(data){
    
    'use strict';
    
    const defaultHtml_mainNav = $('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainNav').html(),
          defaultHtml_mainContainer = $('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainContainer').html(),
          mainContainer = Wafse_client.PageController.LoginAndCoreateAccount.MainContainer
    ;
    
    let self, renderAll, renderMainNav, renderMainContainer;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    renderMainNav = function(){
        // NOTE: Create Wafse_client.PageController.LoginAndCoreateAccount.MainNav if add dom action to mainNav.
        //       Refer Wafse_client.PageController.LoginAndCoreateAccount.MainContainer.
        Wafse_client.HtmlTemplateRenderer().addRender($('#appBody'), defaultHtml_mainNav);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    renderMainContainer = function(){
        Wafse_client.HtmlTemplateRenderer().addRender($('#appBody'), defaultHtml_mainContainer, function(){
            mainContainer(data).initDomAction();
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    renderAll = function(){
        renderMainNav();
        renderMainContainer();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        console.log(data);
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {renderAll:renderAll, renderMainNav:renderMainNav, renderMainContainer:renderMainContainer};
    return self;
};