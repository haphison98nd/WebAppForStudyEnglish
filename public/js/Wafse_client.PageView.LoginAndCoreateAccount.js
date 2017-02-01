Wafse_client.PageView.LoginAndCoreateAccount = function(){
    
    'use strict';
    
    const htmlTemplate = $('.htmlTemplate#loginAndCoreateAccount').html();
    
    let self, constructor, render;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    render = function(){
        Wafse_client.HtmlTemplateRenderer().render(htmlTemplate, function(){
            Wafse_client.PageController.LoginAndCoreateAccount.MainContainer();
        });
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {render:render};
    return self;
};