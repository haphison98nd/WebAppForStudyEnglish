Wafse_client.Activator.AppDrawer = function(_appNavigation, _appDataManager){
    
    'use strict';
    
    const appDrawer = $('#appDrawer'),
          appDrawerTitle = $('#appDrawerTitle')
    ;
    
    let self, appDrawerButton,
        waitTimeForMdlLayoutDrawer = 3000,
        isDrawerOpen = false,
        appNavigation, appDataManager
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function openDrawer () {
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            if (!isDrawerOpen){
                appDrawerButton.click();
                isDrawerOpen = true;
            }
            $('mdl-layout__drawer')
                .addClass('is-visible')
                .attr('aria-hidden', 'false')
            ; 
            $('.mdl-layout__obfuscator').removeClass('is-visible');
        }, waitTimeForMdlLayoutDrawer);
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function closeDrawer () {
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            isDrawerOpen = false;
            $('.mdl-layout__drawer')
                .removeClass('is-visible')
                .attr('aria-hidden', 'true')
            ;
            $('.mdl-layout__obfuscator').removeClass('is-visible');
        }, waitTimeForMdlLayoutDrawer);
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function showDrawerButton () {
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            appDrawerButton.css({'display':'inline'});
        }, waitTimeForMdlLayoutDrawer);
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    function hiddenDrawerButton () {
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            appDrawerButton.css({'display':'none'});
        }, waitTimeForMdlLayoutDrawer);
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function appendRender (jQueryObj, __callback) {
        appDrawer.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });        
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function clearPage () {
        appDrawer.empty();
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        setTimeout( function(){ 
            appDrawerButton = $('.mdl-layout__drawer-button');
            waitTimeForMdlLayoutDrawer = 0;
        }, waitTimeForMdlLayoutDrawer);
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