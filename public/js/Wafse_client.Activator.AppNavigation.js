Wafse_client.Activator.AppNavigation = function(_appDataManager){
    
    'use strict';

    const appNavigation = $('#appNavigation'),
          progressSpinner = $('#progressSpinner')
    ;
    
    let self, appendRender, afterRender, clearPage, showProgressSpinner, hiddenProgressSpinner,
        addButton, deleteButtons,
        appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    addButton = function (type, text, callback) {
        const buttons = $($('.htmlTemplate#navButtons').clone().html());
        let button;
        if( type === 'danger') {
            button = buttons.find('.btn-outline-danger');
        } else if(type === 'primary'){
            button = buttons.find('.btn-outline-primary');
        }
        if (callback) button.click(callback);
        button.text(text);
        appNavigation.prepend(button);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    deleteButtons = function () {
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
        addButton:addButton, deleteButtons:deleteButtons
    };
    return self;
};