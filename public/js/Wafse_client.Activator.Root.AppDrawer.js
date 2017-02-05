Wafse_client.Activator.Root.AppDrawer = function(_appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          mdlLayoutDrawerButton = 500,
          waitTimeForMdlLayoutDrawer = 1000
    ;
    
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
        }, waitTimeForMdlLayoutDrawer);
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
        }, waitTimeForMdlLayoutDrawer);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    showDrawerButton = function (){
        setTimeout(function(){
            appDrawerButton.css({'display':'inline'});
        }, waitTimeForMdlLayoutDrawer);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    hiddeDrawerButton = function (){
        setTimeout(function(){
            console.log(appDrawerButton);
            appDrawerButton.css({'display':'none'});
        }, waitTimeForMdlLayoutDrawer);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearDrawerList = function () {
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        setTimeout( function(){ appDrawerButton = $('.mdl-layout__drawer-button')}, mdlLayoutDrawerButton);
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