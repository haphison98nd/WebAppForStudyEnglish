Wafse_client.Activator.Root.AppDrawer = function(_appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer');
    
    let self, appDrawerButton, appDataManager, openDrawer, closeDrawer, showDrawerButton, hiddeDrawerButton, clearDrawerList;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    openDrawer = function (){
        setTimeout(function(){
            appDrawerButton.click();
            $('mdl-layout__drawer')
                .addClass('is-visible')
                .attr('aria-hidden', 'false')
            ;   
        }, 50);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    closeDrawer = function (){
        setTimeout(function(){
            $('.mdl-layout__drawer')
                .removeClass('is-visible')
                .attr('aria-hidden', 'true')
            ;
            $('.mdl-layout__obfuscator').removeClass('is-visible');
        }, 50);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    showDrawerButton = function (){
        setTimeout(function(){
            appDrawerButton.css({'display':'inline'});
        }, 50);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    hiddeDrawerButton = function (){
        setTimeout(function(){
            console.log(appDrawerButton);
            appDrawerButton.css({'display':'none'});
        }, 50);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearDrawerList = function () {
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        setTimeout( function(){ appDrawerButton = $('.mdl-layout__drawer-button')}, 10);
        appDataManager = _appDataManager;
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { 
        showDrawerButton:showDrawerButton, openDrawer:openDrawer, closeDrawer:closeDrawer, 
        hiddeDrawerButton:hiddeDrawerButton, clearDrawerList:clearDrawerList 
    };
    return self;
};