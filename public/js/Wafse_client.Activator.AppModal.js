Wafse_client.Activator.AppModal = function(_appDataManager){
    
    'use strict';

    const appModal = $('#appModal'),
          modalTitle = $('#modalLongTitle'),
          modalBody = $('#modalBody'),
          closeModalButton = $('#closeModalButton'),
          modalCover = $('.modal.fade'),
          closeIcon = $('#closeIcon')
    ;
    
    let self, showModal, setModalTitle, appendRender, clearPage, activateButtons, 
        appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    showModal = function () {
        appModal.modal('toggle');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    setModalTitle = function (str) {
        modalTitle.text(str);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    appendRender = function(jQueryObj, __callback){
        modalBody.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });    
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    clearPage = function(){
        modalBody.empty();
        setModalTitle('');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateButtons = function () {
        closeModalButton.click(clearPage);
        closeIcon.click(clearPage);
        modalCover.click(clearPage);
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