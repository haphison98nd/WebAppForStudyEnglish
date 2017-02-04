Wafse_client.Activator.LoginAndCoreateAccount.MainContainer = function(_appBody, _mainNav, _loginAndCoreateAccountRenderer, _appDataManager){
    
    'use strict';
    
    const mainContainer = $('.loginAndCoreateAccount#mainContainer'),
          mainMassage_login = $('#mainMassage_login'),
          mainMassage_createAccount = $('#mainMassage_createAccount'),
          userNameInput = $('.loginAndCoreateAccount#userNameInput'),
          passWordInput = $('.loginAndCoreateAccount#passWordInput'),
          enterBtn = $('.loginAndCoreateAccount#enterBtn'),
          createAccountBtn = $('.loginAndCoreateAccount#createAccountBtn'),
          submitBtn = $('.loginAndCoreateAccount#submitBtn'),
          returnBtn = $('.loginAndCoreateAccount#returnBtn'),
          alertForUserNameInput = $('.alert.loginAndCoreateAccount#alertForUserNameInput'),
          alertForPassWordInput = $('.alert.loginAndCoreateAccount#alertForPassWordInput')
    ;
    
    let self, activateAll, setLoginDataTotextInput, activateButtons, setAlertMessage,
        validUserNameInputAndPassWordInput, remove,
        appBody, mainNav, loginAndCoreateAccountRenderer, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    validUserNameInputAndPassWordInput = function(){
        if(String(userNameInput.val()) === '' && String(passWordInput.val()) === '') {
            setAlertMessage('ユーザ名を入力してください', 'パスワードを入力してください');
            return false;
        } else if (String(userNameInput.val()) === '') {
            setAlertMessage('ユーザ名を入力してください', '');
            return false;
        } else if (String(passWordInput.val()) === '') {
            setAlertMessage('', 'パスワードを入力してください');
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
                mainNav.showProgressSpinner();
                $.ajax({
                    type: 'POST',
                    url : '/authorize',
                    data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                    success: function(authorizationResult){
                        mainNav.hiddenProgressSpinner();
                        if (authorizationResult.status === 'success'){ 
                            appDataManager.setItem('LoginAndCoreateAccount.userName', String(userNameInput.val()));
                            appDataManager.setItem('LoginAndCoreateAccount.userPassword', String(passWordInput.val()));
                            appBody.clearPage();
                            loginAndCoreateAccountRenderer.renderMainNav();
                            console.log(authorizationResult.message);
                        } else if(authorizationResult.status  === 'userNameError'){ 
                            setAlertMessage(authorizationResult.message, '');
                        } else if (authorizationResult.status  === 'passwordError'){ 
                            setAlertMessage('', authorizationResult.message);
                        }
                    }
                });
            }
        });
        
        createAccountBtn.click(function(){
            setAlertMessage('', '');
            mainMassage_login.css({'display':'none'});
            mainMassage_createAccount.css({'display':'block'});
            enterBtn.css({'display':'none'});
            createAccountBtn.css({'display':'none'});
            returnBtn.css({'display':'inline'});
            returnBtn.click(function(){
                remove();
                loginAndCoreateAccountRenderer.renderMainContainer();
            });
            submitBtn.css({'display':'inline'});
            submitBtn.click(function(){
                if(validUserNameInputAndPassWordInput()){
                    mainNav.showProgressSpinner();
                    $.ajax({
                        type: 'POST',
                        url : '/createAccount',
                        data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                        success: function(createAccountResult){
                            mainNav.hiddenProgressSpinner();
                            if (createAccountResult.status === 'success'){ 
                                appDataManager.setItem('LoginAndCoreateAccount.userName', String(userNameInput.val()));
                                appDataManager.setItem('LoginAndCoreateAccount.userPassword', String(passWordInput.val()));
                                appBody.clearPage();
                                loginAndCoreateAccountRenderer.renderMainNav();
                                console.log(createAccountResult.message);
                            } else if(createAccountResult.status  === 'error'){ 
                                setAlertMessage(createAccountResult.message, '');
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
    
    setAlertMessage = function(alertMessageForUserNameInput, alertMessageForPassWordInput){   
        if(alertMessageForUserNameInput || alertMessageForUserNameInput !== ''){
            alertForUserNameInput
                .css({'display':'block'})
                .html('<b>' + String(alertMessageForUserNameInput) + '</b>')
            ;            
        }else{
            alertForUserNameInput.css({'display':'none'});  
        }
        
        if(alertMessageForPassWordInput || alertMessageForPassWordInput !== ''){
            alertForPassWordInput
                .css({'display':'block'})
                .html('<b>' + String(alertMessageForPassWordInput) + '</b>')
            ;            
        }else{
            alertForPassWordInput.css({'display':'none'});              
        }        
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
        appBody = _appBody;
        mainNav = _mainNav;
        loginAndCoreateAccountRenderer = _loginAndCoreateAccountRenderer;
        appDataManager = _appDataManager;
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {activateAll:activateAll, remove:remove};
    return self;
};