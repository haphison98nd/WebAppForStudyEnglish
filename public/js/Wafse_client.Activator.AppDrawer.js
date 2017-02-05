Wafse_client.Activator.AppDrawer = function(_appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          htmlTemplate_mdlNavigationLink = $('.htmlTemplate#mdlNavigationLink').html(),
          appDrawerTitle = $('#appDrawerTitle'),
          mdlLayoutDrawerButton = 800,
          waitTimeForMdlLayoutDrawer = 1000
    ;
    
    let self, appDrawerButton, appDataManager, openDrawer, closeDrawer, 
        showDrawerButton, hiddeDrawerButton, addDrawerList, removeDrawerList, clearDrawerList
    ;
    // console.log(htmlTemplate_mdlNavigationLink.clone());
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

    addDrawerList = function () {
        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearDrawerList = function () {
        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearDrawerList = function () {
        appDrawer.empty();
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
        hiddeDrawerButton:hiddeDrawerButton, clearDrawerList:clearDrawerList,
        addDrawerList:addDrawerList, removeDrawerList:addDrawerList
    };
    return self;
};