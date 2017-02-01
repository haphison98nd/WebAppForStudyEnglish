Wafse_client.PageView.LoginAndCoreateAccount = function(){
    
    'use strict';
    
    const htmlTemplate = $('.defaultHtml#loginAndCoreateAccount').html();
    
    let self, constructor, render;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    render = function(){
        Wafse_client.HtmlTemplateRenderer().render(htmlTemplate, function(){
            Wafse_client.PageController.LoginAndCoreateAccount.MainContainer().constructor({userNameInput:''});
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {render:render};
    return self;
};