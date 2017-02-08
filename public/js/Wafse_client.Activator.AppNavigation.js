Wafse_client.Activator.AppNavigation = function(_appDataManager){
    
    'use strict';

    const appNavigation = $('#appNavigation'),
          progressSpinner = $('#progressSpinner')
    ;
    
    let self, appendRender, afterRender, clearPage, showProgressSpinner, hiddenProgressSpinner,
        appDataManager
    ;

    showProgressSpinner = function () {
        progressSpinner.css({'display':'inline'});
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

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

    self = { showProgressSpinner:showProgressSpinner, hiddenProgressSpinner:hiddenProgressSpinner };
    return self;
};