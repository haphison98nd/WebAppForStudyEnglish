Wafse_client.ComponentCreator.LoginAndCoreateAccountForm = function(_appNavigation, _appDataManager, _router){
    
    'use strict';
    
    let htmlTemplate_loginAndCoreateAccountForm = $($('.htmlTemplate#loginAndCoreateAccountForm').clone().html()),
        mainMassage_login = htmlTemplate_loginAndCoreateAccountForm.find('#mainMassage_login'),
        mainMassage_createAccount = htmlTemplate_loginAndCoreateAccountForm.find('#mainMassage_createAccount'),
        userNameInput = htmlTemplate_loginAndCoreateAccountForm.find('#userNameInput'),
        passWordInput = htmlTemplate_loginAndCoreateAccountForm.find('#passWordInput'),
        enterBtn = htmlTemplate_loginAndCoreateAccountForm.find('#enterBtn'),
        createAccountBtn = htmlTemplate_loginAndCoreateAccountForm.find('#createAccountBtn'),
        submitBtn = htmlTemplate_loginAndCoreateAccountForm.find('#submitBtn'),
        returnBtn = htmlTemplate_loginAndCoreateAccountForm.find('#returnBtn'),
        alertForUserNameInput = htmlTemplate_loginAndCoreateAccountForm.find('.alert#alertForUserNameInput'),
        alertForPassWordInput = htmlTemplate_loginAndCoreateAccountForm.find('.alert#alertForPassWordInput'),
        mainContainerSmall = Wafse_client.ComponentCreator.MainContainer('mainContainerSmall', 'ようこそ'),
        self, activateAll, conbineComponents, activateTextInput, activateButtons, showAlertMessage, hiddenAlertMessage,
        validUserNameInputAndPassWordInput, remove,
        appNavigation, appDataManager, router
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
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
    
    
    // private
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
    
    // private
    hiddenAlertMessage = function(){
        alertForUserNameInput.css({'display':'none'});
        alertForPassWordInput.css({'display':'none'});
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    activateTextInput = function(){
        if (appDataManager.getItem('View.LoginAndCoreateAccount.userName')){
            userNameInput.val(String(appDataManager.getItem('View.LoginAndCoreateAccount.userName')));
        }
        if (appDataManager.getItem('View.LoginAndCoreateAccount.userPassword')){
            passWordInput.val(String(appDataManager.getItem('View.LoginAndCoreateAccount.userPassword')));
        }
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    activateButtons = function(){
        enterBtn.click(function(){
            if(validUserNameInputAndPassWordInput()){
                appNavigation.showProgressSpinner();
                $.ajax({
                    type: 'GET',
                    url : '/authorize',
                    data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                    cache: false,
                    success: function(authorizationResult){
                        appNavigation.hiddenProgressSpinner();
                        if (authorizationResult.status === 'success'){ 
                            appDataManager.setItem('View.LoginAndCoreateAccount.userName', String(userNameInput.val()));
                            appDataManager.setItem('View.LoginAndCoreateAccount.userPassword', String(passWordInput.val()));
                            router['/textSelectMenu']();
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
                router['/login-and-create-account']();
            });
            submitBtn.css({'display':'inline'});
            submitBtn.click(function(){
                if(validUserNameInputAndPassWordInput()){
                    appNavigation.showProgressSpinner();
                    $.ajax({
                        type: 'GET',
                        url : '/createAccount',
                        data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                        cache: false,
                        success: function(createAccountResult){
                            appNavigation.hiddenProgressSpinner();
                            if (createAccountResult.status === 'success'){ 
                                appDataManager.setItem('View.LoginAndCoreateAccount.userName', String(userNameInput.val()));
                                appDataManager.setItem('View.LoginAndCoreateAccount.userPassword', String(passWordInput.val()));
                                router['/textSelectMenu']();
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

    // private
    conbineComponents = function () {
        mainContainerSmall.appendRender(htmlTemplate_loginAndCoreateAccountForm);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    activateAll = function(){
        activateTextInput();
        activateButtons();
        conbineComponents();
        // Memoriy Leak Test
        // setTimeout(function(){ enterBtn.click(); }, 2000);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
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
        activateAll();
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:mainContainerSmall.jQeryObj, remove:remove};
    return self;
};