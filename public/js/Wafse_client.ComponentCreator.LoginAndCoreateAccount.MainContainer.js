Wafse_client.ComponentCreator.LoginAndCoreateAccount.MainContainer = function(_appNavigation, _appDataManager, _router){
    
    'use strict';
    
    const defaultHtml_mainContainer = $($('.defaultHtml.loginAndCoreateAccount#defaultHtml_mainContainer').clone().html()),
          mainContainer = defaultHtml_mainContainer,
          mainMassage_login = defaultHtml_mainContainer.find('#mainMassage_login'),
          mainMassage_createAccount = defaultHtml_mainContainer.find('#mainMassage_createAccount'),
          userNameInput = defaultHtml_mainContainer.find('.loginAndCoreateAccount#userNameInput'),
          passWordInput = defaultHtml_mainContainer.find('.loginAndCoreateAccount#passWordInput'),
          enterBtn = defaultHtml_mainContainer.find('.loginAndCoreateAccount#enterBtn'),
          createAccountBtn = defaultHtml_mainContainer.find('.loginAndCoreateAccount#createAccountBtn'),
          submitBtn = defaultHtml_mainContainer.find('.loginAndCoreateAccount#submitBtn'),
          returnBtn = defaultHtml_mainContainer.find('.loginAndCoreateAccount#returnBtn'),
          alertForUserNameInput = defaultHtml_mainContainer.find('.alert.loginAndCoreateAccount#alertForUserNameInput'),
          alertForPassWordInput = defaultHtml_mainContainer.find('.alert.loginAndCoreateAccount#alertForPassWordInput')
    ;
    
    let self, activateAll, setLoginDataTotextInput, activateButtons, showAlertMessage, hiddenAlertMessage,
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
    
    setLoginDataTotextInput = function(){
        userNameInput.val(String(appDataManager.getItem('LoginAndCoreateAccount.userName')));
        passWordInput.val(String(appDataManager.getItem('LoginAndCoreateAccount.userPassword')));
        /*
        userNameInput.on('change keyup', function(){
            // console.log(String($(this).val()));
        });
        passWordInput.on('change keyup', function(){
            // console.log(String($(this).val()));
        });        
        */
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
                            router['/']();
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
                router['/login-and-coreate-account']();
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
                                router['/']();
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
        setLoginDataTotextInput();
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
    
    self = {jQeryObj:defaultHtml_mainContainer , remove:remove};
    return self;
};