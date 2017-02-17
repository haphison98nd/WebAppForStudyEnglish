Wafse_client.ComponentCreator.QuestionForm = function(_appDataManager, _router, _sentenceENG, _sentenceJPN, _callback){
    
    'use strict';
    
    let htmlTemplate_questionForm = $($('.htmlTemplate#questionForm').clone().html()),
        questionForm = htmlTemplate_questionForm,
        progressBar = htmlTemplate_questionForm.find('#progressBar'),
        timeLimitInst = htmlTemplate_questionForm.find('#timeLimit'),
        englishSentenceInst = htmlTemplate_questionForm.find('#englishSentenceInst'),
        self, setProgressBarValue, setEnglishSentenceInst, remove,
        appDataManager, router, sentenceENG, sentenceJPN, callback
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
    
    // private
    setEnglishSentenceInst = function (text) {
        englishSentenceInst.text(String(text));
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
        sentenceENG = _sentenceENG;
        sentenceJPN = _sentenceJPN;
        callback = _callback;
        
        setEnglishSentenceInst(sentenceENG);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_questionForm, setProgressBarValue:setProgressBarValue, remove:remove};
    return self;
};