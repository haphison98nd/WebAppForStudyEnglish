Wafse_client.ComponentCreator.QuestionForm = function(_appDataManager, _router, _mainContainer, _callback){
    
    'use strict';
    
    const htmlTemplate_questionForm = $($('.htmlTemplate#questionForm').clone().html()),
          questionForm = htmlTemplate_questionForm,
          progressBar = htmlTemplate_questionForm.find('#progressBar'),
          timeLimitInst = htmlTemplate_questionForm.find('#timeLimit')
    ;
    
    let self, appendRender, setProgressBarValue, activateAll, remove,
        appDataManager, router, mainContainer, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setProgressBarValue= function (value, remainTime) {
        progressBar
            .css({'width':String(value) + '%'})
            .attr('aria-valuenow', String(value))
        ;
        timeLimitInst.text(String(remainTime));
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        questionForm.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDataManager = _appDataManager;
        router = _router;
        callback = _callback;
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_questionForm, setProgressBarValue:setProgressBarValue, remove:remove};
    return self;
};