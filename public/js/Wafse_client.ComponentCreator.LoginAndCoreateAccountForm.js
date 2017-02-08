Wafse_client.ComponentCreator.LoginAndCoreateAccountForm = function(_appNavigation, _appDataManager, _router, _mainContainerSmall){
    
    'use strict';
    
    const htmlTemplate_loginAndCoreateAccountForm = $($('.htmlTemplate#htmlTemplate_loginAndCoreateAccountForm').clone().html()),
          mainMassage_login = htmlTemplate_loginAndCoreateAccountForm.find('#mainMassage_login'),
          mainMassage_createAccount = htmlTemplate_loginAndCoreateAccountForm.find('#mainMassage_createAccount'),
          userNameInput = htmlTemplate_loginAndCoreateAccountForm.find('.loginAndCoreateAccount#userNameInput'),
          passWordInput = htmlTemplate_loginAndCoreateAccountForm.find('.loginAndCoreateAccount#passWordInput'),
          enterBtn = htmlTemplate_loginAndCoreateAccountForm.find('.loginAndCoreateAccount#enterBtn'),
          createAccountBtn = htmlTemplate_loginAndCoreateAccountForm.find('.loginAndCoreateAccount#createAccountBtn'),
          submitBtn = htmlTemplate_loginAndCoreateAccountForm.find('.loginAndCoreateAccount#submitBtn'),
          returnBtn = htmlTemplate_loginAndCoreateAccountForm.find('.loginAndCoreateAccount#returnBtn'),
          alertForUserNameInput = htmlTemplate_loginAndCoreateAccountForm.find('.alert.loginAndCoreateAccount#alertForUserNameInput'),
          alertForPassWordInput = htmlTemplate_loginAndCoreateAccountForm.find('.alert.loginAndCoreateAccount#alertForPassWordInput')
    ;
    
    let self, activateAll, activateTextInput, activateButtons, showAlertMessage, hiddenAlertMessage,
        validUserNameInputAndPassWordInput, remove,
        appNavigation, appDataManager, router, mainContainerSmall
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
            mainContainerSmall.setMainMassage('新規アカウントを作成');
            mainMassage_login.css({'display':'none'});
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
        mainContainerSmall.setMainMassage('ようこそ');
        activateTextInput();
        activateButtons();
        // Memoriy Leak Test
        // setTimeout(function(){ enterBtn.click(); }, 2000);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mainContainerSmall.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;
        mainContainerSmall = _mainContainerSmall;
        activateAll();
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_loginAndCoreateAccountForm, remove:remove};
    return self;
};