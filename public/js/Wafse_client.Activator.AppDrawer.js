Wafse_client.Activator.AppDrawer = function(_appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          htmlTemplate_mdlNavigationLink = $('.htmlTemplate#mdlNavigationLink').html(),
          appDrawerTitle = $('#appDrawerTitle'),
          waitTimeForMdlLayoutDrawerButton = 400,
          waitTimeForMdlLayoutDrawer = 500
    ;
    
    let self, appDrawerButton, appDataManager, openDrawer, closeDrawer, 
        showDrawerButton, hiddenDrawerButton, addDrawerList, removeDrawerList, clearDrawerList
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
    
    hiddenDrawerButton = function (){
        setTimeout(function(){
            appDrawerButton.css({'display':'none'});
        }, waitTimeForMdlLayoutDrawer);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    addDrawerList = function(jQueryObj, callback){
        appDrawer.append(jQueryObj).ready(function(){ 
            if (callback) callback(); 
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearDrawerList = function () {
        appDrawer.empty();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        setTimeout( function(){ appDrawerButton = $('.mdl-layout__drawer-button')}, waitTimeForMdlLayoutDrawerButton);
        appDataManager = _appDataManager;
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { 
        showDrawerButton:showDrawerButton, openDrawer:openDrawer, closeDrawer:closeDrawer, 
        hiddenDrawerButton:hiddenDrawerButton, clearDrawerList:clearDrawerList,
        addDrawerList:addDrawerList, removeDrawerList:addDrawerList
    };
    return self;
};