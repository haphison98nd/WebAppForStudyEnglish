Wafse_client.Activator.AppModal = function(_appDataManager){
    
    'use strict';

    const appModal = $('#appModal'),
          modalTitle = $('#modalLongTitle'),
          modalBody = $('#modalBody')
    ;
    
    let self, activateModal, showModal, setModalTitle, appendRender, clearPage, activateButtons, 
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
    
    // private
    clearPage = function(){
        modalBody.empty();
        setModalTitle('');
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    activateModal = function () {
        appModal.on('hidden.bs.modal', function (e) {
            clearPage();
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager; 
        activateModal();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { showModal:showModal, setModalTitle:setModalTitle, appendRender:appendRender};
    return self;
};