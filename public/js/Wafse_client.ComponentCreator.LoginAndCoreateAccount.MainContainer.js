Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer = function(_appNavigation, _appDataManager, _router){
    
    'use strict';
    
    const htmlTemplate_mainContainer = $($('.htmlTemplate.loginAndCoreateAccount#htmlTemplate_mainContainer').clone().html()),
          mainContainer = htmlTemplate_mainContainer,
          mainMassage_login = htmlTemplate_mainContainer.find('#mainMassage_login'),
          mainMassage_createAccount = htmlTemplate_mainContainer.find('#mainMassage_createAccount'),
          userNameInput = htmlTemplate_mainContainer.find('.loginAndCoreateAccount#userNameInput'),
          passWordInput = htmlTemplate_mainContainer.find('.loginAndCoreateAccount#passWordInput'),
          enterBtn = htmlTemplate_mainContainer.find('.loginAndCoreateAccount#enterBtn'),
          createAccountBtn = htmlTemplate_mainContainer.find('.loginAndCoreateAccount#createAccountBtn'),
          submitBtn = htmlTemplate_mainContainer.find('.loginAndCoreateAccount#submitBtn'),
          returnBtn = htmlTemplate_mainContainer.find('.loginAndCoreateAccount#returnBtn'),
          alertForUserNameInput = htmlTemplate_mainContainer.find('.alert.loginAndCoreateAccount#alertForUserNameInput'),
          alertForPassWordInput = htmlTemplate_mainContainer.find('.alert.loginAndCoreateAccount#alertForPassWordInput')
    ;
    
    let self, activateAll, activateTextInput, activateButtons, showAlertMessage, hiddenAlertMessage,
        validUserNameInputAndPassWordInput, remove,
        appNavigation, appDataManager, router
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    validUserNameInputAndPassWordInput = function(){
        if(String(userNameInput.val()) === '' && String(passWordInput.val()) === '') {
            showAlertMessage('ユーザ名を入力してください', 'パスワードを入力してください');
            return false;
        } else if (String(userNameInput.val()) === '') {
            showAlertMessage('ユーザ名を入力してください', '');
            return false;
        } else if (String(passWordInput.val()) === '') {
            showAlertMessage('', 'パスワードを入力してください');
            return false;
        }
        
        return true;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    activateTextInput = function(){
        userNameInput.val(String(appDataManager.getItem('LoginAndCoreateAccount.userName')));
        passWordInput.val(String(appDataManager.getItem('LoginAndCoreateAccount.userPassword')));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    activateButtons = function(){
        enterBtn.click(function(){
            if(validUserNameInputAndPassWordInput()){
                appNavigation.showProgressSpinner();
                $.ajax({
                    type: 'POST',
                    url : '/authorize',
                    data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                    success: function(authorizationResult){
                        appNavigation.hiddenProgressSpinner();
                        if (authorizationResult.status === 'success'){ 
                            appDataManager.setItem('LoginAndCoreateAccount.userName', String(userNameInput.val()));
                            appDataManager.setItem('LoginAndCoreateAccount.userPassword', String(passWordInput.val()));
                            router['#dummy']();
                            console.log(authorizationResult.message);
                        } else if(authorizationResult.status  === 'userNameError'){ 
                            showAlertMessage(authorizationResult.message, '');
                        } else if (authorizationResult.status  === 'passwordError'){ 
                            showAlertMessage('', authorizationResult.message);
                        }
                    }
                });
            }
        });
        
        createAccountBtn.click(function(){
            mainMassage_login.css({'display':'none'});
            mainMassage_createAccount.css({'display':'block'});
            enterBtn.css({'display':'none'});
            createAccountBtn.css({'display':'none'});
            returnBtn.css({'display':'inline'});
            returnBtn.click(function(){
                router['#login-and-create-account']();
            });
            submitBtn.css({'display':'inline'});
            submitBtn.click(function(){
                if(validUserNameInputAndPassWordInput()){
                    appNavigation.showProgressSpinner();
                    $.ajax({
                        type: 'POST',
                        url : '/createAccount',
                        data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                        success: function(createAccountResult){
                            appNavigation.hiddenProgressSpinner();
                            if (createAccountResult.status === 'success'){ 
                                appDataManager.setItem('LoginAndCoreateAccount.userName', String(userNameInput.val()));
                                appDataManager.setItem('LoginAndCoreateAccount.userPassword', String(passWordInput.val()));
                                router['#dummy']();
                                console.log(createAccountResult.message);
                            } else if(createAccountResult.status  === 'error'){ 
                                showAlertMessage(createAccountResult.message, '');
                            }
                        }
                    });
                }
            });
            mainContainer.append(submitBtn);
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    showAlertMessage = function(alertMessageForUserNameInput, alertMessageForPassWordInput){   
        hiddenAlertMessage();
        if(alertMessageForUserNameInput){
            alertForUserNameInput
                .css({'display':'block'})
                .html('<b>' + String(alertMessageForUserNameInput) + '</b>')
            ;            
        }
        
        if(alertMessageForPassWordInput){
            alertForPassWordInput
                .css({'display':'block'})
                .html('<b>' + String(alertMessageForPassWordInput) + '</b>')
            ;            
        }
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
        
    hiddenAlertMessage = function(){
        alertForUserNameInput.css({'display':'none'});
        alertForPassWordInput.css({'display':'none'});
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    activateAll = function(){
        activateTextInput();
        activateButtons();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mainContainer.remove();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;
        activateAll();
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_mainContainer, remove:remove};
    return self;
};