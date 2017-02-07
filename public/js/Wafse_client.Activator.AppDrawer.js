Wafse_client.Activator.AppDrawer = function(_appNavigation, _appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          appDrawerTitle = $('#appDrawerTitle')
    ;
    
    let self, appDrawerButton, openDrawer, closeDrawer,
        showDrawerButton, hiddenDrawerButton, appendRender, clearPage,
        waitTimeForMdlLayoutDrawerButton = 3000,
        waitTimeForMdlLayoutDrawer = waitTimeForMdlLayoutDrawerButton,
        appNavigation, appDataManager
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    openDrawer = function (){
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
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
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
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
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            appDrawerButton.css({'display':'inline'});
        }, waitTimeForMdlLayoutDrawer);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    hiddenDrawerButton = function (){
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            appDrawerButton.css({'display':'none'});
        }, waitTimeForMdlLayoutDrawer);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    appendRender = function(jQueryObj, _callback){
        appDrawer.append(jQueryObj).ready(function(){ 
            if (_callback) _callback(self); 
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
            waitTimeForMdlLayoutDrawer = 10;
        }, waitTimeForMdlLayoutDrawerButton);
        appNavigation = _appNavigation;
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