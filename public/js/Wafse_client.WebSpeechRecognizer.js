Wafse_client.WebSpeechRecognizer = function () {
    
    'use strict';
    
    let self, recognition, activateAll, startRec, stopRec,
        callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    startRec = function(_callback){
        callback = _callback;
        recognition.start();
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    stopRec = function(){
        recognition.stop();  
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    activateAll = function () {
        // recognition.lang = 'ja';
        recognition.lang = 'en';
        recognition.continuous = true;
        recognition.addEventListener('result', function(e){        
            let resultText;
            for(let resultIdx = e.resultIndex; resultIdx < e.results.length; resultIdx++){
                const result = e.results.item(resultIdx);                
                if(result.final === true || result.isFinal === true){
                    resultText = result.item(0).transcript;
                }
            }
            if(callback) callback(resultText);
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
        recognition = new webkitSpeechRecognition();
        activateAll();
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { startRec:startRec, stopRec:stopRec };
    return self;
};
