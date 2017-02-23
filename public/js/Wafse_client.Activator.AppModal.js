Wafse_client.Activator.AppModal = function(_appDataManager){
    
    'use strict';

    const appModal = $('#appModal'),
          modalTitle = $('#modalLongTitle'),
          modalBody = $('#modalBody'),
          closeModalButton = $('#closeModalButton')
    ;
    
    let self, showModal, setModalTitle, appendRender, clearPage, activateButtons, 
        appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    showModal = function () {
        appModal.modal('toggle');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setModalTitle = function (str) {
        modalTitle.text(str);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendRender = function(jQueryObj, __callback){
        modalBody.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });    
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    clearPage = function(){
        modalBody.empty();
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateButtons = function () {
        closeModalButton.click(clearPage);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager; 
        activateButtons();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { showModal:showModal, setModalTitle:setModalTitle, appendRender:appendRender, clearPage:clearPage };
    return self;
};