Wafse_client.ComponentCreator.QuestionForm = function(_appDataManager, _router, _callback){
    
    'use strict';
    
    let htmlTemplate_questionForm = $($('.htmlTemplate#questionForm').clone().html()),
        questionForm = htmlTemplate_questionForm,
        progressBar = htmlTemplate_questionForm.find('#progressBar'),
        timeLimitInst = htmlTemplate_questionForm.find('#timeLimit'),
        mainContainer = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle', 'test', null),    
        self, appendRender, setProgressBarValue, conbineComponents, activateAll, remove,
        appDataManager, router, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setProgressBarValue = function (value, remainTime) {
        progressBar
            .css({'width':String(value) + '%'})
            .attr('aria-valuenow', String(value))
        ;
        timeLimitInst.text(String(remainTime));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    conbineComponents = function () {
        mainContainer.appendRender(htmlTemplate_questionForm);
        htmlTemplate_questionForm = mainContainer.jQeryObj;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function(){
        conbineComponents();
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