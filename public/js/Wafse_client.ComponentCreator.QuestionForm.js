Wafse_client.ComponentCreator.QuestionForm = function(_appDataManager, _router, _sentenceENG, _sentenceJPN, _callback){
    
    'use strict';
    
    let htmlTemplate_questionForm = $($('.htmlTemplate#questionForm').clone().html()),
        questionForm = htmlTemplate_questionForm,
        textImput = htmlTemplate_questionForm.find('#textImput'),
        progressBar = htmlTemplate_questionForm.find('#progressBar'),
        timeLimitInst = htmlTemplate_questionForm.find('#timeLimit'),
        japaneseSentenceInst = htmlTemplate_questionForm.find('#japaneseSentenceInst'),
        voiceInputBtn = htmlTemplate_questionForm.find('#voiceInputBtn'),
        playSoundBtn = htmlTemplate_questionForm.find('#playSoundBtn'),
        checkAnswerButton = htmlTemplate_questionForm.find('#checkAnswerButton'),
        nextProblemBtn = htmlTemplate_questionForm.find('#nextProblemBtn'),
        self, setProgressBarValue, setJapaneseSentenceInst, activateButtons, transformStringForAnswer, remove,
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
    setJapaneseSentenceInst = function (text) {
        japaneseSentenceInst.text(String(text));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    remove = function () {
        questionForm.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    transformStringForAnswer = function (str) {
        let transformedStr = String(str).toLowerCase().split(' ').join(''),
            lastCase = transformedStr.substr(transformedStr.length-1, transformedStr.length)
        ;
        if (lastCase === '.' || lastCase === '?' || lastCase === '') {
            transformedStr = transformedStr.substr(0, transformedStr.length-1);
        }
        return transformedStr;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateButtons = function () {
        let defaultTextOfVoiceInputBtn = voiceInputBtn.text(),
            isEnglishSynthSpeaking = false,
            isVoiceRecognizing = false
        ;
        playSoundBtn.click(function(){
            if (!isEnglishSynthSpeaking){
                isEnglishSynthSpeaking = true;
                Wafse_client.Util.WebSpeechSynthes.speechTextInEnglish(sentenceENG, function(){
                    isEnglishSynthSpeaking = false;
                });
            }
        });
        voiceInputBtn.click(function(){
            if(!isVoiceRecognizing){
                isVoiceRecognizing = true;
                voiceInputBtn.text('音声入力中...');
                Wafse_client.Util.WebSpeechRecognizer.startRec(function(result){
                    isVoiceRecognizing = false;
                    Wafse_client.Util.WebSpeechRecognizer.stopRec();
                    textImput.val(String(result));
                    voiceInputBtn.text(defaultTextOfVoiceInputBtn);
                });
            } else {
                isVoiceRecognizing = false;
                Wafse_client.Util.WebSpeechRecognizer.stopRec();
                voiceInputBtn.text(defaultTextOfVoiceInputBtn);
            }
        });
        checkAnswerButton.click(function(){
            let transFormedUserAnswer = transformStringForAnswer(textImput.val()),
                transFormedAnswer =  transformStringForAnswer(sentenceENG)
            ;
            console.log('transFormedUserAnswer: ' + transFormedUserAnswer);
            console.log('transFormedAnswer: ' + transFormedAnswer);
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDataManager = _appDataManager;
        router = _router;
        sentenceENG = _sentenceENG;
        sentenceJPN = _sentenceJPN;
        console.log('sentenceENG: ' + sentenceENG);
        console.log('sentenceJPN: ' + sentenceJPN);
        callback = _callback;
        
        activateButtons();
        setJapaneseSentenceInst(sentenceJPN);
        Wafse_client.Util.WebSpeechSynthes.speechTextInJapanese(sentenceJPN);
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_questionForm, setProgressBarValue:setProgressBarValue, remove:remove};
    return self;
};