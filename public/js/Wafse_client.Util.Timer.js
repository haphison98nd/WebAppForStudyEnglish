Wafse_client.Util.Timer = function () {
    
    'use strict';
    
    let self, loop;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function milSecToSec (milSec) {
        return milSec / 100;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function secToMilSec (sec) {
        return sec * 100;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function start (timeLimitSec, callback, finishCallback) {        
        let count = 0;
        loop = setInterval(function(){
            let secCount = milSecToSec(count);
            if (callback) {
                let progressTime = secCount,
                    remainTime = milSecToSec(secToMilSec(timeLimitSec) - count)
                ;
                callback(progressTime, remainTime);
            }
            if(secCount === timeLimitSec){
                clearInterval(loop);
                if(finishCallback) finishCallback();
            }
            count++;
        }, 10);
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function stop() {
        if (loop) clearInterval(loop);
        return self;
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { start:start, stop:stop };
    return self;
};