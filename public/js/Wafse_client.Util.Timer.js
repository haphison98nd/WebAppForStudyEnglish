Wafse_client.Util.Timer = function () {
    
    'use strict';
    
    let self, loop, milSecToSec, secToMilSec, start, stop;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    milSecToSec = function (milSec) {
        return milSec / 100;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    secToMilSec = function (sec) {
        return sec * 100;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    start = function (timeLimitSec, callback, finishCallback) {        
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
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    stop = function(){
        if (loop) clearInterval(loop);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { start:start, stop:stop };
    return self;
};