Wafse_client.PageController.LoginAndCoreateAccount.MainContainer = function(){
    
    'use strict';
    
    const userNameInput = $('.loginAndCoreateAccount#userNameInput'),
          passWordInput = $('.loginAndCoreateAccount#passWordInput')
    ;
    
    let self, constructor, initDomAction, data;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    initDomAction = function(){
        userNameInput.val(data.userNameInput);
        userNameInput.on('change keyup', function(){
            console.log($(this).val());
        });
        passWordInput.on('change keyup', function(){
            console.log($(this).val());
            Wafse_client.HtmlTemplateRenderer().clearPage();
            Wafse_client.PageView.LoginAndCoreateAccount().render();
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    constructor = function(d){
        data = d;
        initDomAction();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {constructor:constructor};
    return self;
};