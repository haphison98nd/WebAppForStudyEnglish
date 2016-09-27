// AnnotationHintDataBase を形態素解析し，単語ベクトル，TF，IDFを格納した DB を作成．
// TF-IDF の計算，Cos 類似度の計算では，このページを参考: http://qiita.com/nmbakfm/items/6bb91b89571dd68fcea6

module.exports = (function () {
    'use strict';
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    var extendedFs                      = require('./ExtendedFs.js'),
        annotationHintDataBaseProcessor = require('./AnnotationHintDataBaseProcessor_temp.js'),
        meCabController                 = require('./MeCabController.js'),
        colors                          = require('colors'),
        startProcessing, createParalledAnnotationHintDB, saveDataBaseAsJson, createDateBasedWordVectorAsync,
        createPracticeDayBasedWordVectorAsync, createUserNameBasedWordVectorAsync, numRounder,
        paralledAnnotationHintDB = [], // 複数のモジュールで利用するためモジュール内グローバルスコープで宣言.
        annotationWordVectorDB   = {},
        TF_POWER   = 6, // TF の値を小数点何桁まで求めるか．
        IDF_POWER  = 6
    ;
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // meCabController は非同期処理しかできないので，本メソッドで annotationHintDataBase を チャンク単位で並列化し配列に格納する．
    // @param callback: paralledAnnotationHintDataBase 作成後に行う処理．paralledAnnotationHintDataBase を引数にとる．
    // @return paralledAnnotationHintDataBase: array. format例: 
    /*
           [{ 
                ahdbNoteLine: '0',
                ahdbChunkType: 'summaryChunk',
                ahdbUserName: 'Iwabuchi',
                ahdbPracticeDay: 'practiceDay-1',
                ahdbDate: '2016-3-28_13-16-52-0766',
                ahdbChunkData: 'summaryChunk_0',
                chunkData: { 
                    chunkDomId: 'summaryChunk_0',
                    left: 1103,
                    top: 592,
                    width: 118,
                    height: 21,
                    stringScoreCol: '1',
                    chunkMiddleAxisY: 575,
                    chunkType: 'summary',
                    chunkHeadLine: 0,
                    chunkTailLine: 0,
                    chunkMiddleLine: 0,
                    parentChunk: null,
                    good: null,
                    chunkAnnotationText: '今日の目標としてまず少しでも進めるように考えていた。',
                    fileName: 'ChunkPianoData_Iwabuchi_2016-3-28_13-16-52-0766_practiceDay-1.json' 
                }
            },
            {   
                ahdbNoteLine: '0',
                ahdbChunkType: 'summaryChunk',
                ahdbUserName: 'mmm',
                ahdbPracticeDay: 'practiceDay-1',
                ahdbDate: '2016-3-18_17-39-23-0726',
                ahdbChunkData: 'summaryChunk_0',
                chunkData: { 
                    chunkDomId: 'summaryChunk_0',
                    left: 1167,
                    top: 594,
                    width: 110,
                    height: 70,
                    stringScoreCol: '1',
                    chunkMiddleAxisY: 629,
                    chunkType: 'summary',
                    chunkHeadLine: 0,
                    chunkTailLine: 0,
                    chunkMiddleLine: 0,
                    parentChunk: null,
                    good: [Object],
                    chunkAnnotationText: '反復練習が大事だと思う。',
                    fileName: 'ChunkPianoData_mmm_2016-3-18_17-39-23-0726_practiceDay-1.json' 
                }
            }
       
                             ・
                             ・
                             ・
            ]
    */
    createParalledAnnotationHintDB = function (annotationHintDataBase) {

        for (var ahdbNoteLine in annotationHintDataBase) {
            for (var ahdbChunkType in annotationHintDataBase[ahdbNoteLine]) {
                for (var ahdbUserName in annotationHintDataBase[ahdbNoteLine][ahdbChunkType]) {
                    for (var ahdbPracticeDay in annotationHintDataBase[ahdbNoteLine][ahdbChunkType][ahdbUserName]) {
                        for (var ahdbDate in annotationHintDataBase[ahdbNoteLine][ahdbChunkType][ahdbUserName][ahdbPracticeDay]) {
                            for (var ahdbChunkData in annotationHintDataBase[ahdbNoteLine][ahdbChunkType][ahdbUserName][ahdbPracticeDay][ahdbDate]) {

                                paralledAnnotationHintDB.push({
                                    ahdbNoteLine: ahdbNoteLine,
                                    ahdbChunkType: ahdbChunkType,
                                    ahdbUserName: ahdbUserName,
                                    ahdbPracticeDay: ahdbPracticeDay,
                                    ahdbDate: ahdbDate,
                                    ahdbChunkData: ahdbChunkData,
                                    chunkData: annotationHintDataBase[ahdbNoteLine][ahdbChunkType][ahdbUserName]
                                                                          [ahdbPracticeDay][ahdbDate][ahdbChunkData]
                                });
                            }
                        }
                    }
                }
            }
        }
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        // paralledAnnotationHintDB をもとに，annotationWordVectorDB に ユーザ名，練習日，練習日時 をキーとして空のオブジェクトを作成する．
        // 例えば練習日時の word vector は練習日時をキーとするオブジェクト内に作成する.
        // この時点での annotationWordVectorDB (annotationHintDataBase の状態によって変動):
        /*
            { 
                Kobayashi: { 
                    'practiceDay-1': { 
                        '2015-1-20_17-53-00-0000': {} 
                    },
                    'practiceDay-2': { 
                        '2016-5-9_16-40-15-0423': {} 
                    },
                    'practiceDay-3': { 
                        '2015-1-21_23-28-00-0000': {} 
                    } 
                },
                mmm: { 
                    'practiceDay-1': { 
                        '2016-3-18_17-39-23-0726': {} 
                    } 
                },
                taka: { 
                    'practiceDay-1': { 
                        '2016-3-18_17-31-39-0710': {} 
                    } 
                } 
            }
        */
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // 練習日時毎に単語辞書を作成．
    // note: meCabController は非同期実行しかできないので，for - in でループを回さず，再帰処理でループを回している．
    createDateBasedWordVectorAsync = function (callback) {

        var meCabLoopCounter = 0,
            paralledAHDB_Length = paralledAnnotationHintDB.length
        ;

        (function initAnnotationWordVectorDataBase() {

            for (var paralledAnnotationHintDB_i in paralledAnnotationHintDB) {

                var annoHintData = paralledAnnotationHintDB[paralledAnnotationHintDB_i];

                if (annotationWordVectorDB[annoHintData.ahdbUserName] == undefined) {
                    annotationWordVectorDB[annoHintData.ahdbUserName] = {};
                }

                if (annotationWordVectorDB[annoHintData.ahdbUserName][annoHintData.ahdbPracticeDay] == undefined) {
                    annotationWordVectorDB[annoHintData.ahdbUserName][annoHintData.ahdbPracticeDay] = {};
                }

                if (annotationWordVectorDB[annoHintData.ahdbUserName][annoHintData.ahdbPracticeDay][annoHintData.ahdbDate] == undefined) {
                    annotationWordVectorDB[annoHintData.ahdbUserName][annoHintData.ahdbPracticeDay][annoHintData.ahdbDate] = {};
                }

            }
        })();
        
        // meCab モジュールは非同期実行であるため，loop 関数を利用して処理．
        (function meCabLoop(){

            var annoHintData = paralledAnnotationHintDB[meCabLoopCounter];

            meCabController.mecabOwakatiAsync(annoHintData.chunkData.chunkAnnotationText, function (result) {

                var dateBasedWordVectorObj = annotationWordVectorDB[annoHintData.ahdbUserName][annoHintData.ahdbPracticeDay][annoHintData.ahdbDate];

                for (var idx in result) {
                    // 同じ単語の key が dateBasedWordVectorObj に存在するかチェックする．
                    // result はオブジェクトでなく配列なので，result[idx] が key となる．
                    if(result[idx] != 'EOS' && result[idx] != '．' && result[idx] != '，' && result[idx] != '。' && result[idx] != '、'){
                        // 解析した単語がオブジェクトプロパティとして存在しない場合，プロパティを作成．
                        // プロパティが存在する場合はカウンタを加算．
                        if (dateBasedWordVectorObj.hasOwnProperty(result[idx]) == false) {
                            dateBasedWordVectorObj[result[idx]] = {
                                wordCount: 1
                            };
                        } else {
                            dateBasedWordVectorObj[result[idx]]['wordCount'] ++;
                        }
                    }
                }

                if (meCabLoopCounter < paralledAHDB_Length - 1) {
                
                    meCabLoopCounter++;
                    meCabLoop();
                
                } else {

                    // TF の計算．
                    // 現れる単語数をN, その単語の出現回数をnとすると TF = n / N となる．
                    // 以下の計算では以下の手順で TF を計算している.
                    // 1. 練習ごとの ChunkData を1文書とし，合計の単語数 totalWordCount を算出.
                    // 2. 単語ごとの出現回数 (wordCount) を totalWordCount で除算.
                    // 3. numRounder で指定した小数点以下の値を四捨五入.
                    
                    (function tfCalclation(){
                        for (var awvdbUserName in annotationWordVectorDB) {
                            for (var awvdbPracticeDay in annotationWordVectorDB[awvdbUserName]) {
                                for (var awvdbDate in annotationWordVectorDB[awvdbUserName][awvdbPracticeDay]) {
                                    
                                    var totalWordCount = 0;
                                    
                                    for (var awvdbWord in annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbDate]) {
                                        totalWordCount += annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbDate][awvdbWord]['wordCount'];
                                    }
                                    
                                    for (var awvdbWord in annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbDate]) {
                                        
                                        // @val wordObj: JS obj. この時点では TF プロパティはない．format例... { wordCount: 1} 
                                        // numRounder で指定した小数点以下の値を四捨五入している．
                                        var wordObj = annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbDate][awvdbWord];
                                        wordObj['TF'] = numRounder(wordObj['wordCount'] / totalWordCount, TF_POWER);
                                        
                                    }
                                
                                }
                            }
                        }
                    })();

                    if (callback) callback(annotationWordVectorDB);
                }
            });
        })();
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // createDateBasedWordVectorAsync で練習日時毎に作成された単語辞書を練習日毎にマージし，練習日毎の単語辞書を作成する．
    createPracticeDayBasedWordVectorAsync = function (callback) {
        
        createDateBasedWordVectorAsync(function (dummy) {
            // awddb は annotationWordVectorDB を意味する．
            for (var awddbUserName in annotationWordVectorDB) {
                
                for (var awddbPracticeDay in annotationWordVectorDB[awddbUserName]) {

                    var practiceDayBasedWordVector = null;

                    // 練習日毎の単語辞書を作成するための key 'all' が存在しない場合は作成する．
                    if (annotationWordVectorDB[awddbUserName][awddbPracticeDay]['all'] == undefined) {
                        annotationWordVectorDB[awddbUserName][awddbPracticeDay]['all'] = {};
                    }

                    practiceDayBasedWordVector = annotationWordVectorDB[awddbUserName][awddbPracticeDay]['all'];

                    for (var awddbDate in annotationWordVectorDB[awddbUserName][awddbPracticeDay]) {

                        // note: 練習日毎の単語辞書を作成するための key 'all' は他の練習日時(awddbPracticeDay) と同じ階層に作成されるため，
                        //       all も for(var awddbDate in annotationWordVectorDB[awddbUserName][awddbPracticeDay]){ のループに含まれる．
                        //       そのため，awddbDate が 'all' の時は練習日毎の単語辞書への加算処理をしないよう，条件分岐しなければならない．
                        //       これを忘れると，練習日毎の単語辞書の値が2倍になる．
                        if (awddbDate != 'all') {
                         
                            var dateBasedWordVector = annotationWordVectorDB[awddbUserName][awddbPracticeDay][awddbDate];

                            for (var dateBasedWordVector_i in dateBasedWordVector) {
                                // 同じ単語の key が practiceDayBasedWordVector に存在するかチェックする．
                                // dateBasedWordVector はオブジェクトなので，dateBasedWordVector_i が key となる．
                                if (practiceDayBasedWordVector.hasOwnProperty(dateBasedWordVector_i) == false) {
                                    practiceDayBasedWordVector[dateBasedWordVector_i] = {
                                        wordCount: dateBasedWordVector[dateBasedWordVector_i]['wordCount']
                                    };
                                } else {
                                    practiceDayBasedWordVector[dateBasedWordVector_i]['wordCount'] += dateBasedWordVector[dateBasedWordVector_i]['wordCount'];
                                }

                            }   
                        }
                    }

                    // 練習日ごとの word vector 以外は消去する．
                    // todo: オプションで残すか / 消去するかを選択できるようにする．
                    for (var awddbDate in annotationWordVectorDB[awddbUserName][awddbPracticeDay]) {
                        if(awddbDate != 'all') delete annotationWordVectorDB[awddbUserName][awddbPracticeDay][awddbDate]
                    }                    
                    
                }
            }

            if (callback) callback(annotationWordVectorDB);
        });
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////        
    createUserNameBasedWordVectorAsync = function (callback) {
        
        createPracticeDayBasedWordVectorAsync(function (dummy) {

            for (var awddbUserName in annotationWordVectorDB) {

                var userNameBasedWordVector = null;

                // ユーザ毎の単語辞書を作成するための key 'all' が存在しない場合は作成する．
                if (annotationWordVectorDB[awddbUserName]['all'] == undefined) {
                    annotationWordVectorDB[awddbUserName]['all'] = {};
                }

                userNameBasedWordVector = annotationWordVectorDB[awddbUserName]['all'];

                for (var awddbPracticeDay in annotationWordVectorDB[awddbUserName]) {

                    if (awddbPracticeDay != 'all') {

                        var practiceDayBasedWordVector = annotationWordVectorDB[awddbUserName][awddbPracticeDay]['all'];

                        for (var practiceDayBasedWordVector_i in practiceDayBasedWordVector) {

                            if (userNameBasedWordVector.hasOwnProperty(practiceDayBasedWordVector_i) == false) {
                                userNameBasedWordVector[practiceDayBasedWordVector_i] = {
                                    wordCount: practiceDayBasedWordVector[practiceDayBasedWordVector_i]['wordCount']
                                };
                            } else {
                                userNameBasedWordVector[practiceDayBasedWordVector_i][['wordCount']] 
                                                                      += practiceDayBasedWordVector[practiceDayBasedWordVector_i]['wordCount'];
                            }
                        }
                    }
                }
                
                // ユーザごとの word vector 以外は消去する．
                // todo: オプションで残すか / 消去するかを選択できるようにする．
                for (var awddbPracticeDay in annotationWordVectorDB[awddbUserName]) {
                    if(awddbPracticeDay != 'all') delete annotationWordVectorDB[awddbUserName][awddbPracticeDay]
                }                
                
            }

            // TF の計算
            // todo: 関数化できないか?
            // todo: 処理手順に関するコメントを追加．
            for (var awvdbUserName in annotationWordVectorDB) {
                for (var awvdbPracticeDay in annotationWordVectorDB[awvdbUserName]) {
                    if (awvdbPracticeDay == 'all') {
                        var totalWordCount = 0;
                        for (var awvdbWord in annotationWordVectorDB[awvdbUserName][awvdbPracticeDay]) {
                            totalWordCount += annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbWord]['wordCount'];
                        }

                        for (var awvdbWord in annotationWordVectorDB[awvdbUserName][awvdbPracticeDay]) {
                            var wordObj = annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbWord];
                            wordObj['TF'] = numRounder(wordObj['wordCount'] / totalWordCount, TF_POWER);
                        }
                    }
                }
            }

            // IDF の計算
            // todo: 処理手順に関するコメントを追加．
            // ここではユーザごとの単語ベクトルを1文書として扱っている．
            (function calcIdf(){

                var wordFrequency = {}, // ユーザごとの単語ベクトルを1文書としたときの，文書全体における単語の出現頻度．
                    textCount     = 0,  // ユーザごとの単語ベクトルを1文書としたときの，文書の総数．
                    idf           = {}
                ;

                for (var awvdbUserName in annotationWordVectorDB){
                    
                    for (var awvdbPracticeDay in annotationWordVectorDB[awvdbUserName]) {
                        
                        if (awvdbPracticeDay == 'all'){
                            
                            var wordExistdict = {}, // annotationWordVectorDB[awvdbUserName][awvdbPracticeDay][awvdbDate] に，ある単語があるか / ないかのフラグ．
                                userNameBasedWordVector = annotationWordVectorDB[awvdbUserName][awvdbPracticeDay];
                            ;

                            textCount++;
                            
                            for(var word in userNameBasedWordVector){
                                wordExistdict[word] = 1;
                            }

                            for (var wordExistdict_i in wordExistdict){
                                if(wordFrequency[wordExistdict_i] == undefined) wordFrequency[wordExistdict_i] = 0;
                                wordFrequency[wordExistdict_i] += wordExistdict[wordExistdict_i];
                            }  
                        }                            
                    }
                }
                
                for (var word in wordFrequency){
                    idf[word] = -numRounder(Math.log(wordFrequency[word] / textCount), IDF_POWER);
                }
                
                annotationWordVectorDB['IDF'] = idf;
                
            })();
            
            if (callback) callback(annotationWordVectorDB);
        });
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // 小数値を指定された桁数で四捨五入する．
    // @param num  : int，float の数値
    // @param point: 小数点以下何位で四捨五入するか．
    numRounder = function (num, point) {
        var power = Math.pow(10, point); // Math.pow(10, point) は 10 の point 乗を返す．
        num = num * power;
        num = Math.round(num);
        num = num / power;
        return num;
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    saveDataBaseAsJson = function (callback) {
        var strinfiedAnnotationWordVectorDataBase = JSON.stringify(annotationWordVectorDB);
        // extendedFs.writeFile('../AnnotationHintDataBase.json', strinfiedAnnotationHintDataBase, function(err){ // moduleTest 時のファイルパス
        extendedFs.writeFile('../AnnotationWordVectorDataBase.json', strinfiedAnnotationWordVectorDataBase, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('AnnotationWordVectorDataBaseProcessor.js: AnnotationWordVectorDataBase updated.'.green);
                if (callback) callback();
            }
        });
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    startProcessing = function (option, callback) {

        var getAnnotationHintDB, getParalledAnnotationHintDB,
            // methodMap 内のメソッドは非同期メソッド getAnnotationHintDB の後に実行しなければならないため，
            // methodMap を利用して実行する．直接メソッドをエクスポートして実行すると，getAnnotationHintDB の完了前にメソッドが実行されてしまう．
            methodMap = {
                'createDateBasedWordVectorAsync'       : createDateBasedWordVectorAsync,
                'createPracticeDayBasedWordVectorAsync': createPracticeDayBasedWordVectorAsync,
                'createUserNameBasedWordVectorAsync'   : createUserNameBasedWordVectorAsync
            };

        if (option.isSave == undefined) {
            option.isSave = true;
        }

        annotationHintDataBaseProcessor.getAnnotationHintDB_Async(function (annotationHintDataBase) {

            // note: createParalledAnnotationHintDB は非同期に取得される annotationHintDataBase を利用するので，ここで実行しなければならない．
            //       つまり，createParalledAnnotationHintDB を単体で即時実行関数にしてはいけない．
            createParalledAnnotationHintDB(annotationHintDataBase);

            try {
                methodMap[option.method](function () {
                    if (option.isSave) saveDataBaseAsJson();
                    if (callback) callback(annotationWordVectorDB);
                });
            } catch (e) {
                console.log(e);
                console.log('AnnotationWordVectorDataBaseProcessor.js: error 存在しないメソッド名が指定された可能性があります.'.red);
            }
        });
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    return {startProcessing: startProcessing};
})();
///////////////////////////////////////////////
///////////////////////////////////////////////
(function moduleTest() {
    'use strict';
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    var awdp = require('./AnnotationWordVectorDataBaseProcessor');
    awdp.startProcessing({
        method: 'createDateBasedWordVectorAsync',
        isSave: true
    });
})();