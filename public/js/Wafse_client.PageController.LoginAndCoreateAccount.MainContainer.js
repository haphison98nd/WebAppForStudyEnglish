Wafse_client.PageController.LoginAndCoreateAccount.MainContainer = function(data){
    
    'use strict';
    
    const mainMassage_login = $('#mainMassage_login'),
          mainMassage_createAccount = $('#mainMassage_createAccount'),
          mainContainer = $('.loginAndCoreateAccount#mainContainer'),
          progressSpinner = $('.loginAndCoreateAccount#progressSpinner'),
          userNameInput = $('.loginAndCoreateAccount#userNameInput'),
          passWordInput = $('.loginAndCoreateAccount#passWordInput'),
          enterBtn = $('.loginAndCoreateAccount#enterBtn'),
          createAccountBtn = $('.loginAndCoreateAccount#createAccountBtn'),
          submitBtn = $('.loginAndCoreateAccount#submitBtn'),
          returnBtn = $('.loginAndCoreateAccount#returnBtn'),
          alertForUserNameInput = $('.alert.loginAndCoreateAccount#alertForUserNameInput'),
          alertForPassWordInput = $('.alert.loginAndCoreateAccount#alertForPassWordInput')
    ;
    
    let self, initDomAction, initDomAction_textInput, initDomAction_button, setAlertMessage,
        checkUserNameInputAndPassWordInput
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    checkUserNameInputAndPassWordInput = function(){
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
    
    initDomAction_textInput = function(){
        userNameInput.val(data.userNameInput);
        userNameInput.on('change keyup', function(){
            // console.log(String($(this).val()));
        });
        passWordInput.on('change keyup', function(){
            // console.log(String($(this).val()));
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    initDomAction_button = function(){
        enterBtn.click(function(){
            if(checkUserNameInputAndPassWordInput()){
                progressSpinner.css({'display':'inline'});
                $.ajax({
                    type: 'POST',
                    // url : 'http://localhost:3000/authorize',
                    url : 'https://shunkan-eisakubun-web-app.herokuapp.com/authorize',
                    data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                    success: function(authorizationResult){
                        progressSpinner.css({'display':'none'});
                        if (authorizationResult.status === 'success'){ 
                            Wafse_client.HtmlTemplateRenderer().clearPage();
                            Wafse_client.PageView.LoginAndCoreateAccount().renderMainNav();
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
                Wafse_client.HtmlTemplateRenderer().remove($('.loginAndCoreateAccount#mainContainer'));
                Wafse_client.PageView.LoginAndCoreateAccount(data).renderMainContainer();
            });
            submitBtn.css({'display':'inline'});
            submitBtn.click(function(){
                if(checkUserNameInputAndPassWordInput()){
                    progressSpinner.css({'display':'inline'});
                    $.ajax({
                        type: 'POST',
                        // url : 'http://localhost:3000/createAccount',
                        url: 'https://shunkan-eisakubun-web-app.herokuapp.com/createAccount',
                        data: {'userName':String(userNameInput.val()), 'userPassword':String(passWordInput.val())},
                        success: function(createAccountResult){
                            progressSpinner.css({'display':'none'});
                            if (createAccountResult.status === 'success'){ 
                                Wafse_client.HtmlTemplateRenderer().clearPage();
                                Wafse_client.PageView.LoginAndCoreateAccount().renderMainNav();
                                console.log(createAccountResult.message);
                            } else if(createAccountResult.status  === 'error'){ 
                                setAlertMessage(createAccountResult.message, '');
                            }
                        }
                    });
                }
                // data.userNameInput = 'MainContainer -> submitBtn';
                // Wafse_client.PageView.LoginAndCoreateAccount(data).render();
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
    
    initDomAction = function(){
        initDomAction_textInput();
        initDomAction_button();
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){

    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {initDomAction:initDomAction};
    return self;
};