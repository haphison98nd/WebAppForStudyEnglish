Wafse_client.PageController.LoginAndCoreateAccount.MainContainer = function(){
    
    'use strict';
    
    const mainMassage = $('#mainMassage'),
          mainContainer = $('.loginAndCoreateAccount#mainContainer'),
          userNameInput = $('.loginAndCoreateAccount#userNameInput'),
          passWordInput = $('.loginAndCoreateAccount#passWordInput'),
          enterBtn = $('.loginAndCoreateAccount#enterBtn'),
          createAccountBtn = $('.loginAndCoreateAccount#createAccountBtn'),
          submitBtn = $('.btn.loginAndCoreateAccount#submitBtn'),
          alertForUserNameInput = $('.alert.loginAndCoreateAccount#alertForUserNameInput'),
          alertForPassWordInput = $('.alert.loginAndCoreateAccount#alertForPassWordInput')
    ;
    
    let self, constructor, initDomAction, data;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    initDomAction = function(){
        userNameInput.val(data.userNameInput);
        userNameInput.on('change keyup', function(){
            // console.log(String($(this).val()));
        });
        passWordInput.on('change keyup', function(){
            // console.log(String($(this).val()));

        });
        enterBtn.click(function(){
            console.log(String(userNameInput.val()));
            console.log(String(passWordInput.val()));
            setTimeout(function(){
                Wafse_client.PageView.LoginAndCoreateAccount().render();
            }, 2000);
        });
        createAccountBtn.click(function(){
            mainMassage.text('アカウントを作成');
            enterBtn.css({'display':'none'});
            createAccountBtn.css({'display':'none'});
            console.log(submitBtn);
            submitBtn.css({'display':'inline'});
            submitBtn.click(function(){
                setTimeout(function(){
                    alertForPassWordInput
                        .css({'display':'block'})
                        .html('<b>Worning:</b>TestAlertMessageForAlertForPassWordInput')
                    ;
                    alertForUserNameInput
                        .css({'display':'block'})
                        .html('<b>Worning:</b>TestAlertMessageForAlertForUserNameInput')
                    ;
                    setTimeout(function(){
                        Wafse_client.PageView.LoginAndCoreateAccount().render();
                    }, 2000);
                }, 2000);
            });
            mainContainer.append(submitBtn);
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