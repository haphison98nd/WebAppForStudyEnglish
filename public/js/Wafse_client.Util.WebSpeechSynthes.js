Wafse_client.Util.WebSpeechSynthes = (function () {
    
    'use strict';
    
    const englishSynth = new SpeechSynthesisUtterance(), 
          japaneseSynth = new SpeechSynthesisUtterance()
    ;
    
    let self, speechTextInEnglish, speechTextInJapanese,
        waitTimeForSpeechSynthesisOnvoiceschanged = 3000
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    speechTextInEnglish = function(text, callback){
        setTimeout(function(){
            englishSynth.text = String(text);
            window.speechSynthesis.speak(englishSynth);
            englishSynth.onend = function (event) {
                if(callback) callback(event);
            };
        }, waitTimeForSpeechSynthesisOnvoiceschanged);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    speechTextInJapanese = function(text, callback){
        setTimeout(function(){
            japaneseSynth.text = String(text);
            window.speechSynthesis.speak(japaneseSynth);
            japaneseSynth.onend = function (event) {
                if(callback) callback(event);
            };
        }, waitTimeForSpeechSynthesisOnvoiceschanged);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        let isFirstVoiceschanged = true;
        window.speechSynthesis.onvoiceschanged = function() {
            if(isFirstVoiceschanged){
                // console.log(speechSynthesis.getVoices());
                englishSynth.lang = 'en-US';
                englishSynth.voice = speechSynthesis.getVoices()[48];
                japaneseSynth.lang = 'ja-JP';
                japaneseSynth.voice = speechSynthesis.getVoices()[57];
                isFirstVoiceschanged = false;
                waitTimeForSpeechSynthesisOnvoiceschanged = 0;
            }
        };
        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { speechTextInEnglish:speechTextInEnglish, speechTextInJapanese:speechTextInJapanese };
    return self;
})();
