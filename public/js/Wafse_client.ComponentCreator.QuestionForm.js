Wafse_client.ComponentCreator.QuestionForm = function(_appDataManager, _router, _questionWindow, _sentenceJPN, _sentenceENG, _isFinalQ, _callback){
    
    'use strict';
    
    const timer = Wafse_client.Util.Timer();
    
    let questionForm = $($('.htmlTemplate.questionForm').clone().html()).find('#questionForm'),
        textInput = questionForm.find('#textInput'),
        progressBar = questionForm.find('#progressBar'),
        timeLimitInst = questionForm.find('#timeLimit'),
        japaneseSentenceInst = questionForm.find('#japaneseSentenceInst'),
        correctAlert = questionForm.find('#correctAlert'),
        incorrectAlert = questionForm.find('#incorrectAlert'),
        voiceInputBtn = questionForm.find('#voiceInputBtn'),
        playSoundBtn = questionForm.find('#playSoundBtn'),
        checkAnswerBtn = questionForm.find('#checkAnswerBtn'),
        nextProblemBtn = questionForm.find('#nextProblemBtn'),
        self, 
        appDataManager, router, questionWindow, sentenceJPN, sentenceENG, isFinalQ, callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // private
    function setProgressBarValue (value, remainTime) {
        progressBar
            .css({'width':String(value) + '%'})
            .attr('aria-valuenow', String(value))
        ;
        timeLimitInst.text(String(remainTime));
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private 
    function setNextProblemBtnText (str) {
        nextProblemBtn.text(String(str));  
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private
    function setJapaneseSentenceInst (text) {
        japaneseSentenceInst.text(String(text));
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        questionForm.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function checkAnswer (userInput, __sentenceENG) {
        let transFormedUserInput = Wafse_client.Util.SentenceTransformer.transform(String(userInput)),
            transFormedCorrectAnswer =  Wafse_client.Util.SentenceTransformer.transform(String(__sentenceENG))
        ;
        // console.log('transFormedUserInput: ' + transFormedUserInput);
        // console.log('transFormedCorrectAnswer: ' + transFormedCorrectAnswer);
        return transFormedUserInput === transFormedCorrectAnswer ? true : false;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function showAlertMessage (isUserAnswerCorrect, isFinalQuestion, correctAnswer) {
        if(isUserAnswerCorrect){
            correctAlert
                .css({'display':'block'})
                .html('<strong>正解です</strong>')
            ;            
        } else {
            const message = isFinalQuestion ? '終了するには' : '次の問題に進むには';
            // AtD: open source grammer checker.
            AtD.checkTextAreaCrossAJAX('textInput', 'checkLink', 'Edit Text');
            incorrectAlert
                .css({'display':'block'})
                .html('<strong>不正解です．</strong>' + message + 
                      '正答を入力してください．<br>正答例: <strong>' + String(correctAnswer) + '</strong>'
                     )
            ;
        }
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function activateButtons (__sentenceENG, __isFinalQ) {
        let defaultTextOfVoiceInputBtn = voiceInputBtn.text(),
            defaultTextOfPlaySoundBtn = playSoundBtn.text(),
            isFirstCheckAnswer = true,
            isVoiceRecognizing = false,
            isEnglishSynthSpeaking = false,
            isUserAnswerCorrect = false
        ;
        // browser except Chrome don't have webSpeechRecognition and have unstable webSpeeshSynthes.
        if (appDataManager.getItem('Config.userAgent') !== 'chrome') voiceInputBtn.css({'display':'none'});
        
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
            if (isFirstCheckAnswer) {
                if (isVoiceRecognizing) voiceInputBtn.click(); // if voice input is working, stop it by clicking voiceInputBtn.
                isFirstCheckAnswer = false;
                timer.stop();
                isUserAnswerCorrect = checkAnswer(String(textInput.val()), __sentenceENG);
                showAlertMessage(isUserAnswerCorrect, __isFinalQ, __sentenceENG);
                if (appDataManager.getItem('Config.userAgent') === 'chrome') {
                    playSoundBtn.css({'display':'inline'});
                    playSoundBtn.click();
                }
                checkAnswerBtn.css({'display':'none'});
                nextProblemBtn.css({'display':'inline'});
            } else {
                // checkAnswerBtn is also called when user pushes enter.
                nextProblemBtn.click();
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
            if (isVoiceRecognizing) voiceInputBtn.click(); // if voice input is working, stop it by clicking voiceInputBtn.
            // User cannot see next question until typing correct answer if user answer isn't correct.
            if (isUserAnswerCorrect) {
                remove();
                questionWindow.updateQuestionForm();              
            } else {
                if (checkAnswer(String(textInput.val()), __sentenceENG)) {
                    remove();
                    questionWindow.updateQuestionForm();                
                } else {
                    toastr.options = {'positionClass':'toast-bottom-right'};
                    toastr.error('正答を入力してください', '警告', {timeOut: 2000});
                }
            }
        });
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function activateTextInput () {
        setTimeout(function () { textInput.focus(); }, 0); // If we don't use setTimeout here, somehow focus() doesn't work.
        textInput.keypress(function(e){
            // Key code 13 is Enter key.
            if (e.which == 13) {
                e.preventDefault();
                checkAnswerBtn.click();
            }
        });
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;
        router = _router;
        questionWindow = _questionWindow;
        sentenceJPN = _sentenceJPN;
        sentenceENG = _sentenceENG;
        isFinalQ = _isFinalQ;
        callback = _callback;
        
        activateButtons(sentenceENG, isFinalQ);
        activateTextInput();
        setJapaneseSentenceInst(sentenceJPN);
        if (appDataManager.getItem('Config.userAgent') === 'chrome'){
            Wafse_client.Util.WebSpeechSynthes.speechTextInJapanese(sentenceJPN);
        }
        if(isFinalQ) setNextProblemBtnText('終了');
        const timeLimit = appDataManager.getItem('Config.QuestionForm.timeLimit');
        timer.start(timeLimit, function(progressTime, remainTime){
            setProgressBarValue(((timeLimit - progressTime) / timeLimit) * 100, parseInt(remainTime, 10) + 1);
        }, function(){ checkAnswerBtn.click(); });
        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = { jQueryObj:questionForm, remove:remove };
    return self;
};