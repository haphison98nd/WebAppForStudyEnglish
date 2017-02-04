Wafse_client.Activator.LoginAndCoreateAccount.MainNav = function(_appBody, _loginAndCoreateAccount, _appDataManager){
    
    'use strict';
    
    const mainNav = $('.loginAndCoreateAccount#mainNav'),
          progressSpinner = $('.loginAndCoreateAccount#progressSpinner')
    ;
    
    let self, activateAll, remove, showProgressSpinner, hiddenProgressSpinner,
        appBody, loginAndCoreateAccount, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    showProgressSpinner = function () {
        progressSpinner.css({'display':'inline'});
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    hiddenProgressSpinner = function () {
        progressSpinner.css({'display':'none'});
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        mainNav.remove();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    activateAll = function(){

    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appBody = _appBody;
        loginAndCoreateAccount = _loginAndCoreateAccount;
        appDataManager = _appDataManager;
    })();
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {showProgressSpinner:showProgressSpinner, hiddenProgressSpinner:hiddenProgressSpinner, remove:remove};
    return self;
};