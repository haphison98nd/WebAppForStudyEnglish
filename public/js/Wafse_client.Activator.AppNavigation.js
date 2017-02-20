Wafse_client.Activator.AppNavigation = function(_appDataManager){
    
    'use strict';

    const appNavigation = $('#appNavigation'),
          progressSpinner = $('#progressSpinner')
    ;
    
    let self, appendRender, afterRender, clearPage, showProgressSpinner, hiddenProgressSpinner,
        addLogOutButton, deleteLogOutButton,
        appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    addLogOutButton = function (callback) {
        deleteLogOutButton();
        const logOutButton = $($('.htmlTemplate#logOutButton').clone().html());
        if (callback) logOutButton.click(callback);
        appNavigation.append(logOutButton);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    deleteLogOutButton = function () {
        appNavigation.empty();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    showProgressSpinner = function () {
        progressSpinner.css({'display':'inline'});
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    hiddenProgressSpinner = function () {
        progressSpinner.css({'display':'none'});
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { 
        showProgressSpinner:showProgressSpinner, hiddenProgressSpinner:hiddenProgressSpinner,
        addLogOutButton:addLogOutButton, deleteLogOutButton:deleteLogOutButton
    };
    return self;
};