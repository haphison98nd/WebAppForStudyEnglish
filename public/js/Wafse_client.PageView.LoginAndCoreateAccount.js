Wafse_client.PageView.LoginAndCoreateAccount = function(data){
    
    'use strict';
    
    const htmlTemplate = $('.defaultHtml#loginAndCoreateAccount').html(),
          mainContainer = Wafse_client.PageController.LoginAndCoreateAccount.MainContainer
    ;
    
    let self, render;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    render = function(){
        Wafse_client.HtmlTemplateRenderer().render(htmlTemplate, function(){
            mainContainer(data).initDomAction();
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor (){
        console.log(data);
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {render:render};
    return self;
};