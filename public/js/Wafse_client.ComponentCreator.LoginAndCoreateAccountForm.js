Wafse_client.ComponentCreator.LoginAndCoreateAccountForm = function(_appNavigation, _appDataManager, _router){
    
    'use strict';
    
    let loginAndCoreateAccountForm = $($('.htmlTemplate.loginAndCoreateAccountForm').clone().html()).find('#loginAndCoreateAccountForm'),
        mainMassage_login = loginAndCoreateAccountForm.find('#mainMassage_login'),
        mainMassage_createAccount = loginAndCoreateAccountForm.find('#mainMassage_createAccount'),
        userNameInput = loginAndCoreateAccountForm.find('#userNameInput'),
        passWordInput = loginAndCoreateAccountForm.find('#passWordInput'),
        enterBtn = loginAndCoreateAccountForm.find('#enterBtn'),
        createAccountBtn = loginAndCoreateAccountForm.find('#createAccountBtn'),
        submitBtn = loginAndCoreateAccountForm.find('#submitBtn'),
        returnBtn = loginAndCoreateAccountForm.find('#returnBtn'),
        alertForUserNameInput = loginAndCoreateAccountForm.find('.alert#alertForUserNameInput'),
        alertForPassWordInput = loginAndCoreateAccountForm.find('.alert#alertForPassWordInput'),
        mainContainerSmall = Wafse_client.ComponentCreator.MainContainer('mainContainerSmall', 'ようこそ'),
        self,
        appNavigation, appDataManager, router
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function isUserNameInputAndPassWordInputValid () {
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
    }
    
    
    // private
    function showAlertMessage (alertMessageForUserNameInput, alertMessageForPassWordInput) {   
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
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function hiddenAlertMessage () {
        alertForUserNameInput.css({'display':'none'});
        alertForPassWordInput.css({'display':'none'});
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function activateTextInput () {
        if (appDataManager.getItem('Config.LoginAndCoreateAccount.userName')) {
            userNameInput.val(String(appDataManager.getItem('Config.LoginAndCoreateAccount.userName')));
        }
        if (appDataManager.getItem('Config.LoginAndCoreateAccount.userPassWord')) {
            passWordInput.val(String(appDataManager.getItem('Config.LoginAndCoreateAccount.userPassWord')));
        }
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function activateButtons () {
        enterBtn.click(function(){
            if(isUserNameInputAndPassWordInputValid()){
                appNavigation.showProgressSpinner();
                $.ajax({
                    type: 'POST',
                    url : '/authorize',
                    data: {'userName':String(userNameInput.val()), 'userPassWord':String(passWordInput.val())},
                    success: function(authorizationResult){
                        appNavigation.hiddenProgressSpinner();
                        if (authorizationResult.status === 'success'){
                            appDataManager.setItem('Config.LoginAndCoreateAccount.userName', String(userNameInput.val()));
                            appDataManager.setItem('Config.LoginAndCoreateAccount.userPassWord', String(passWordInput.val()));
                            toastr.options = {'positionClass':'toast-bottom-right'};
                            toastr.success(String(authorizationResult.message));
                            history.pushState(null, null, '#text-select-menu');       
                            router.authorized();
                            router['#text-select-menu']();
                        } else if(authorizationResult.status  === 'userNameError'){ 
                            showAlertMessage(authorizationResult.message, '');
                        } else if (authorizationResult.status  === 'passWordError'){ 
                            showAlertMessage('', authorizationResult.message);
                        }
                    }
                });
            }
        });
        createAccountBtn.click(function(){
            mainContainerSmall.setNavigator('新規アカウントを作成');
            mainMassage_login.css({'display':'none'});
            enterBtn.css({'display':'none'});
            createAccountBtn.css({'display':'none'});
            returnBtn.css({'display':'inline'});
            returnBtn.click(function(){
                router['#login-and-create-account']();
            });
            submitBtn.css({'display':'inline'});
            submitBtn.click(function(){
                if(isUserNameInputAndPassWordInputValid()){
                    appNavigation.showProgressSpinner();
                    $.ajax({
                        type: 'POST',
                        url : '/createAccount',
                        data: {'userName':String(userNameInput.val()), 'userPassWord':String(passWordInput.val())},
                        success: function(createAccountResult){
                            appNavigation.hiddenProgressSpinner();
                            if (createAccountResult.status === 'success'){ 
                                appDataManager.setItem('Config.LoginAndCoreateAccount.userName', String(userNameInput.val()));
                                appDataManager.setItem('Config.LoginAndCoreateAccount.userPassWord', String(passWordInput.val()));
                                toastr.options = {'positionClass':'toast-bottom-right'};
                                toastr.success(String(createAccountResult.message));
                                history.pushState(null, null, '#text-select-menu');
                                router.authorized();
                                router['#text-select-menu']();
                            } else if(createAccountResult.status  === 'error'){ 
                                showAlertMessage(createAccountResult.message, '');
                            }
                        }
                    });
                }
            });
        });        
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function conbineComponents () {
        mainContainerSmall.appendRender(loginAndCoreateAccountForm);
    }
        
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        mainContainerSmall.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appNavigation = _appNavigation;
        appDataManager = _appDataManager;
        router = _router;

        activateTextInput();
        activateButtons();
        conbineComponents();
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = { jQueryObj:mainContainerSmall.jQueryObj, remove:remove };
    return self;
};