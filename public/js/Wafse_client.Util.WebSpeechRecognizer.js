Wafse_client.Util.WebSpeechRecognizer = (function () {
    
    'use strict';
    
    let self, recognition, startRec, stopRec,
        callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    startRec = function(_callback){
        callback = _callback;
        recognition.start();
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    stopRec = function(){
        recognition.stop();  
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
        recognition = new webkitSpeechRecognition();
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
            if(callback) {
                callback(resultText);
                callback = null;
            }
        });
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { startRec:startRec, stopRec:stopRec };
    return self;
})();
