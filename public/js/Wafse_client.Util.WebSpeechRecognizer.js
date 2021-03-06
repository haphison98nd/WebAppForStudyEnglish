Wafse_client.Util.WebSpeechRecognizer = (function () {
    
    'use strict';
    
    let self, recognition, 
        callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function startRec (_callback) {
        callback = _callback;
        recognition.start();
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function stopRec () {
        recognition.stop();  
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        try {
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
        } catch (e) {
            console.log(e);
        }
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { startRec:startRec, stopRec:stopRec };
    return self;
})();
