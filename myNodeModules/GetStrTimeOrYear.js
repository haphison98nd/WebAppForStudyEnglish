// 現在時刻を取得するモジュール．
// 日付(例: 2016/1/1)または時刻(例: 09:03:08:0032) を返却．
module.exports = (function(){ // 'date' または 'time'
    
    'use strict';

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    function getTime () {
        
        var date = new Date(),
            hour         = date.getHours(),
            minutes      = date.getMinutes(),
            seconds      = date.getSeconds(),
            milliseconds = date.getMilliseconds()
        ;

        // todo: Math.floor で 0 を付与する仕様に変更.
        if(hour < 10) hour = '0' + hour;
        if(minutes < 10) minutes = '0' + minutes; 
        if(seconds < 10) seconds = '0' + seconds;
        if(milliseconds < 10){
            milliseconds = '000' + milliseconds;
        }else if (milliseconds < 100){
            milliseconds = '00' + milliseconds;
        }else if (milliseconds < 1000){
            milliseconds = '0' + milliseconds;
        }

        return String() + hour + ':' + minutes + ':' + seconds + ':' + milliseconds;
        
    }

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    
    function getDate () {

        var date = new Date(),
            month = date.getMonth()+1,
            day   = date.getDate(),
            year  = date.getFullYear()
        ;
        
        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day; 
        
        return String() + year + '/' + month + '/' + day;
        
    }
    
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    
    return { getDate:getDate, getTime:getTime };
    
})();