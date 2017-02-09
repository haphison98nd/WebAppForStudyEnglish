Wafse_client.Activator.AppDrawer = function(_appNavigation, _appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          appDrawerTitle = $('#appDrawerTitle')
    ;
    
    let self, appDrawerButton, openDrawer, closeDrawer,
        showDrawerButton, hiddenDrawerButton, appendRender, clearPage,
        waitTimeForMdlLayoutDrawerButton = 3000,
        waitTimeForMdlLayoutDrawer = waitTimeForMdlLayoutDrawerButton,
        isDrawerOpening = false,
        appNavigation, appDataManager
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    openDrawer = function (){
        appNavigation.showProgressSpinner();
        isDrawerOpening = true;
        
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            if (!isDrawerOpening){
                appDrawerButton.click();
            }
            $('mdl-layout__drawer')
                .addClass('is-visible')
                .attr('aria-hidden', 'false')
            ; 
            $('.mdl-layout__obfuscator').removeClass('is-visible');
            isDrawerOpening = false;
        }, waitTimeForMdlLayoutDrawer);
        return self;
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
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    showDrawerButton = function (){
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            appDrawerButton.css({'display':'inline'});
        }, waitTimeForMdlLayoutDrawer);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    hiddenDrawerButton = function (){
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            appDrawerButton.css({'display':'none'});
        }, waitTimeForMdlLayoutDrawer);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    appendRender = function(jQueryObj, __callback){
        appDrawer.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });        
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    clearPage = function () {
        appDrawer.empty();
        return self;
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