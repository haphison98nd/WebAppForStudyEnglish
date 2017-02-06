Wafse_client.Activator.AppDrawer = function(_appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          appDrawerTitle = $('#appDrawerTitle')
    ;
    
    let self, appDrawerButton, openDrawer, closeDrawer,
        showDrawerButton, hiddenDrawerButton, appendRender, clearPage,
        waitTimeForMdlLayoutDrawerButton = 3000,
        waitTimeForMdlLayoutDrawer = waitTimeForMdlLayoutDrawerButton,
        appDataManager
    ;
    
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

    appendRender = function(jQueryObj, callback){
        appDrawer.append(jQueryObj).ready(function(){ 
            if (callback) callback(); 
        });        
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearPage = function () {
        appDrawer.empty();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        setTimeout( function(){ 
            appDrawerButton = $('.mdl-layout__drawer-button')
            waitTimeForMdlLayoutDrawer = 50;
        }, waitTimeForMdlLayoutDrawerButton);
        appDataManager = _appDataManager;
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { 
        showDrawerButton:showDrawerButton, openDrawer:openDrawer, closeDrawer:closeDrawer, 
        hiddenDrawerButton:hiddenDrawerButton, appendRender:appendRender, clearPage:clearPage
    };
    return self;
};