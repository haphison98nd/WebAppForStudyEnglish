Wafse_client.ComponentCreator.QuestionForm = function(_appDataManager, _router, _questionWindow, _sentenceENG, _sentenceJPN, _callback){
    
    'use strict';
    
    const timer = Wafse_client.Util.Timer();
    
    let htmlTemplate_questionForm = $($('.htmlTemplate#questionForm').clone().html()),
        questionForm = htmlTemplate_questionForm,
        textInput = htmlTemplate_questionForm.find('#textInput'),
        progressBar = htmlTemplate_questionForm.find('#progressBar'),
        timeLimitInst = htmlTemplate_questionForm.find('#timeLimit'),
        japaneseSentenceInst = htmlTemplate_questionForm.find('#japaneseSentenceInst'),
        correctAlert = htmlTemplate_questionForm.find('#correctAlert'),
        incorrectAlert = htmlTemplate_questionForm.find('#incorrectAlert'),
        voiceInputBtn = htmlTemplate_questionForm.find('#voiceInputBtn'),
        playSoundBtn = htmlTemplate_questionForm.find('#playSoundBtn'),
        checkAnswerBtn = htmlTemplate_questionForm.find('#checkAnswerBtn'),
        nextProblemBtn = htmlTemplate_questionForm.find('#nextProblemBtn'),
        self, setProgressBarValue, setJapaneseSentenceInst, activateButtons, transformStringForAnswer, 
        checkAnswer, showAlertMessage, activateTextInput, setNextProblemBtnText, remove,
        appDataManager, router, questionWindow, sentenceENG, sentenceJPN, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // private
    setProgressBarValue = function (value, remainTime) {
        progressBar
            .css({'width':String(value) + '%'})
            .attr('aria-valuenow', String(value))
        ;
        timeLimitInst.text(String(remainTime));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    setNextProblemBtnText = function (str) {
        nextProblemBtn.text(String(str));  
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    setJapaneseSentenceInst = function (text) {
        japaneseSentenceInst.text(String(text));
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
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
    checkAnswer = function (userInput, __sentenceENG) {
        let transFormedUserInput = transformStringForAnswer(userInput),
            transFormedCorrectAnswer =  transformStringForAnswer(__sentenceENG)
        ;
        // console.log('transFormedUserInput: ' + transFormedUserInput);
        // console.log('transFormedCorrectAnswer: ' + transFormedCorrectAnswer);
        return transFormedUserInput === transFormedCorrectAnswer ? true : false;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    showAlertMessage = function(isCorrect, correctAnswer){
        if(isCorrect){
            correctAlert
                .css({'display':'block'})
                .html('<strong>正解です</strong>')
            ;            
        } else {
            // AtD: open source grammer checker.
            // AtD.checkTextAreaCrossAJAX('textInput', 'checkLink', 'Edit Text');
            incorrectAlert
                .css({'display':'block'})
                .html('<strong>不正解です</strong> （正答例: ' + String(correctAnswer) + ' ）')
            ;
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateButtons = function (__sentenceENG) {
        let defaultTextOfVoiceInputBtn = voiceInputBtn.text(),
            defaultTextOfPlaySoundBtn = playSoundBtn.text(),
            isVoiceRecognizing = false,
            isEnglishSynthSpeaking = false,
            isAlreadyCheckAnswer = false
        ;
        voiceInputBtn.click(function(){
            if(!isVoiceRecognizing){
                isVoiceRecognizing = true;
                voiceInputBtn.text('音声入力中...');
                Wafse_client.Util.WebSpeechRecognizer.startRec(function(result){
                    isVoiceRecognizing = false;
                    Wafse_client.Util.WebSpeechRecognizer.stopRec();
                    textInput.val(String(result));
                    voiceInputBtn.text(defaultTextOfVoiceInputBtn);
                });
            } else {
                isVoiceRecognizing = false;
                Wafse_client.Util.WebSpeechRecognizer.stopRec();
                voiceInputBtn.text(defaultTextOfVoiceInputBtn);
            }
        });
        checkAnswerBtn.click(function(){
            if (isVoiceRecognizing) voiceInputBtn.click(); // if voice input is working, stop it by clicking voiceInputBtn.
            if(!isAlreadyCheckAnswer) {
                isAlreadyCheckAnswer = true;
                timer.stop();
                showAlertMessage(checkAnswer(String(textInput.val()), __sentenceENG), __sentenceENG);
                voiceInputBtn.css({'display':'none'});
                checkAnswerBtn.css({'display':'none'});
                playSoundBtn.css({'display':'inline'});
                nextProblemBtn.css({'display':'inline'});
            }
        });
        playSoundBtn.click(function(){
            if (!isEnglishSynthSpeaking){
                playSoundBtn.text('英文音声を再生中...');
                isEnglishSynthSpeaking = true;
                Wafse_client.Util.WebSpeechSynthes.speechTextInEnglish(__sentenceENG, function(){
                    isEnglishSynthSpeaking = false;
                    playSoundBtn.text(defaultTextOfPlaySoundBtn);
                });
            }
        });
        nextProblemBtn.click(function(){
            remove();
            questionWindow.updateQuestionForm();
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    activateTextInput = function () {
        setTimeout(function () { textInput.focus(); }, 0); // If we don't use setTimeout here, somehow focus() doesn't work.
        textInput.keypress(function(e){
            // Key code 13 is Enter key.
            if (e.which == 13 && String(textInput.val()) !== '') {
                e.preventDefault();
                checkAnswerBtn.click();
            }
        });
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDataManager = _appDataManager;
        router = _router;
        questionWindow = _questionWindow;
        sentenceENG = _sentenceENG;
        sentenceJPN = _sentenceJPN;
        callback = _callback;
        
        activateButtons(sentenceENG);
        activateTextInput();
        setJapaneseSentenceInst(sentenceJPN);
        Wafse_client.Util.WebSpeechSynthes.speechTextInJapanese(sentenceJPN);

        const timeLimit = appDataManager.getItem('Config.QuestionForm.timeLimit');
        timer.start(timeLimit, function(progressTime, remainTime){
            setProgressBarValue(((timeLimit - progressTime) / timeLimit) * 100, parseInt(remainTime, 10) + 1);
        }, function(){ checkAnswerBtn.click(); });
        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_questionForm, setNextProblemBtnText:setNextProblemBtnText, remove:remove};
    return self;
};