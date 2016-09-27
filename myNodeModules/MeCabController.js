module.exports = (function(){
    
    'use strict'

    var MeCab = require('mecab-async'), 
        mecab = new MeCab(),
        mecabOchasenAsync, mecabOwakatiAsync
    ;
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // chasen フォーマットで形態素解析.
    mecabOchasenAsync = function(text, callback){
        mecab.parse( String() + text, function(err, result){        // 非同期実行
        // mecab.parseSync( String() + text, function(err, result){ // 同期実行．mecab.js の execSync が undefined で動作せず．
            if (err) throw err;
            callback(result)
        });        
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // 分かち書き結果のみ返却．
    mecabOwakatiAsync = function(text, callback){
        mecab.wakachi( String() + text, function(err, result){        // 非同期実行
        // mecab.wakachiSync( String() + text, function(err, result){ // 同期実行．mecab.js の execSync が undefined で動作せず．
            if (err) throw err;
            callback(result)
        });        
    };

    return {mecabOchasenAsync:mecabOchasenAsync, mecabOwakatiAsync:mecabOwakatiAsync};
})();
///////////////////////////////////////////////
///////////////////////////////////////////////
/*
(function moduleTest(){
        
    'use strict'

    var mecabTest = MecabTest();
    
    mecabTest.mecabOchasenAsync('和音が出てきた時に左手がついてこない', function(result){
        console.log(result);
    });

    mecabTest.mecabOwakatiAsync('和音が出てきた時に左手がついてこない', function(result){
        console.log(result);
    });

})()
*/