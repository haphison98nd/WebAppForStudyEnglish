Wafse_client.Activator.AppModal = function(_appDataManager){
    
    'use strict';

    const appModal = $('#appModal'),
          modalTitle = $('#modalLongTitle'),
          modalBody = $('#modalBody')
    ;
    
    let self,
        appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function showModal () {
        appModal.modal('toggle');
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function setModalTitle (str) {
        modalTitle.text(str);
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function appendRender (jQueryObj, __callback) {
        modalBody.append(jQueryObj).ready(function(){ 
            if (__callback) __callback(self); 
        });    
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function clearPage () {
        modalBody.empty();
        setModalTitle('');
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function activateModal () {
        appModal.on('hidden.bs.modal', function (e) {
            clearPage();
        });
    }

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