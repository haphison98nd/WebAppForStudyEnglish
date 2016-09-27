// var TsvMidiDataProcessor = function(userRequestedFileName){
module.exports = (function(){
    'use strict';
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    var getMidiDataColRow, getPracticeData, createPracticeData, getArraySum, getArrayAve, arrayNomalizer, getPracticeDataVector, getInterOnsetInterval,
        extendedFs        = require('./ExtendedFs.js'),
        noteLinePosition  = require('./ScoreDataParser.js')('./ScoreData/TurcoScore.json').getNoteLinePosition(),
        // noteLinePosition  = require('./ScoreDataParser.js')('../ScoreData/TurcoScore.json').getNoteLinePosition(), // moduleTest 時のファイルパス．
        colors            = require('colors'),
        // noteLinePosition から音符列の最初と最後の列を抽出．
        // note: ハードコーディングせずに音符列の最初と最後の列を取り出そうとした結果，かなりトリッキーな書き方になってしまった．
        //       単純に，midiDataColRow の音符列情報の最小値，最大値から音符列の最初と最後の列を抽出した方がわかりやすいかもしれない．
        firstNoteLine     = noteLinePosition.scoreCol[Object.keys(noteLinePosition.scoreCol)[0]].start,
        finalNoteLine     = noteLinePosition.scoreCol[Object.keys(noteLinePosition.scoreCol)[Object.keys(noteLinePosition.scoreCol).length - 1]].end,
        tsvMidiData_array = null
    ;
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // 視線情報が混じっている tsvMidiData から MIDI 情報のみを抽出し，各行を tab で split し格納． 
    // @param tsvMidiData {js obj}: 処理する TsvMidiData の名前と extendedFs で読み込んだ実際のファイル
    //                              format例: {
    //                                          fileName:'./TsvMidiData/TsvMidiData_Kobayashi_2015-1-20_17-53-00-0000_practiceDay-1.txt',
    //                                          file    : extendedFs で読み込んだ TsvMidiData ファイル
    //                                        }
    // @return {js obj}: ファイル名と tsv ファイル中の MIDI データを行．列に split した2重配列．
    /*                    format例: 
                            {fileName:'./TsvMidiData/TsvMidiData_Kobayashi_2015-1-20_17-53-00-0000_practiceDay-1.txt',
                             data    : [
                                         [ 'KEY', '0001775036', '29:35:0036', '--', '049', '079', 'G6', '084', 'ON', '--', 'E6', 'G6', 'C4', '00' ],
                                         [ 'KEY', '0001775045', '29:35:0045', '--', '049', '076', 'E6', '088', 'ON', '--', 'E6', 'G6', 'C4', '00' ],
                                                                                                 ・
                                                                                                 ・
                                         [ 'KEY', '0001796661', '29:56:0661', '--', '073', '052', 'E4', '0000000000', 'OFF', '--', 'H5', 'E4', '00','00' ]
                                       ]                                       
    */
    getMidiDataColRow = function(tsvMidiData){
        
        var splitedTsvMidiDataCol    = null, // 1行毎に split した tsvMidiData を格納．
            midiDataColRow           = []    // tsvMidiData から 'KEY' で始まる MIDI の行のみを抽出し，TAB で split して格納. 
                                             // midiDataColRow[0][0] は 0 行目 の 'KEY' 行の 0 列目を指す. 
        ;
        
        splitedTsvMidiDataCol = tsvMidiData.file.split('\n');
        
        for(var splitedTsvMidiDataCol_i in splitedTsvMidiDataCol){
            
            var splitedTsvMidiDataRow = null;
            
            splitedTsvMidiDataRow = splitedTsvMidiDataCol[splitedTsvMidiDataCol_i].split('\t');
        
            if(splitedTsvMidiDataRow[0] == 'KEY'){
                midiDataColRow.push(splitedTsvMidiDataRow);
            }
        }
        
        return {fileName:tsvMidiData.fileName, data:midiDataColRow};  
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // 各音符列を何回演奏したかを note on で計算し，配列に格納．
    // 音符列が 1 つだけ遷移した時 (例: 音符列0 → 音符列1) のみ IOI を算出し，遷移回数で正規化した値を返却．
    createPracticeData = function(midiDataColRow){
        
        var counterTest,
            noteLineCounter      = [], // 音符列毎に，何度その列が演奏されたかをカウント．*** 音符列の音符数で正規化されていない点に注意 ***．
            ioiCounter           = [], // 音符列が 1 つだけ遷移した時 (例: 音符列0 → 音符列1) のみ IOI を算出し格納．
                                       // todo: *** IOI は正しい値が算出されていない．*** これは，アルゴリズムのミスではなく，現状の計算方法は練習モードを
                                       //       考慮していないため．先生システムの練習モードは不規則なパターンで遷移することが過去に確認されている．
                                       //       何らかの方法で練習モードを考慮して IOI を算出できるようにする．
            transitionOneCounter = [], // 音符列が 1 つだけ遷移した回数をカウント．*** この値は音符数で正規化されていない，音符列毎の演奏回数と等しい．***.
            velocityCounter      = [],
            misTouchCounter      = [],
            befNoteLineIdx       = null,
            befNoteLine          = null,
            practiceData         = {}, // ファイル名を key として noteLineCounter, ioiCounter, transitionOneCounter を return するためのオブジェクト．
                                       // return に直接オブジェクトの key を付けてみたが，ダメだったのでこのようにした．
            queuePointButtonCounter = [0, 0, 0, 0], // queuePointCounter[0] は qp 1 機能の利用回数を示す．
            playMusicButtonCounter  = 0,            // お手本再生回数を示す．
            practiceModeBtnCounter  = 0             // 練習モード切替ボタンを示す．
        ;

        // 各配列の初期化．これを行わないと undefined をインクリメントすることになり，正しい結果が得られない．
        for(var idx = firstNoteLine; idx <= finalNoteLine; idx++ ){
            noteLineCounter[idx]      = 0;
            ioiCounter[idx]           = 0;
            transitionOneCounter[idx] = 0;
            velocityCounter[idx]      = 0;
            misTouchCounter[idx]      = 0;
        }
        
        for (var idx in midiDataColRow.data){
            
            if(midiDataColRow.data[idx][8] == 'ON'){
                
                var nowNoteLine   = parseInt(midiDataColRow.data[idx][4], 10),
                    userInputNote = midiDataColRow.data[idx][6],
                    velocity      = parseInt(midiDataColRow.data[idx][5], 10),
                    correctNotes  = [midiDataColRow.data[idx][10], midiDataColRow.data[idx][11], midiDataColRow.data[idx][12]]
                ;
                
                // QPボタン，お手本再生ボタン，練習モード切替ボタンが打鍵されたときは当該機能利用カウンタへ加算のみを行い，練習回数などのカウントは行わない．
                if(userInputNote == 'Gis7' || userInputNote == 'Ais7' || userInputNote == 'Cis8' || 
                   userInputNote == 'Dis8'   || userInputNote == 'C8' || userInputNote == 'H7'
                  ){
                    
                    switch(userInputNote){
                        case 'Gis7':
                            queuePointButtonCounter[0]++
                            break;
                        case 'Ais7':
                            queuePointButtonCounter[1]++
                            break; 
                        case 'Cis8':
                            queuePointButtonCounter[2]++
                            break; 
                        case 'Dis8':
                            queuePointButtonCounter[3]++
                            break; 
                        case 'C8':
                            playMusicButtonCounter++
                            break; 
                        case 'H7':
                            practiceModeBtnCounter++;
                            break; 
                    }
                    
                }else{

                    noteLineCounter[nowNoteLine]++;

                    velocityCounter[nowNoteLine] += velocity
                    if((userInputNote != correctNotes[0]) && (userInputNote != correctNotes[1]) && (userInputNote != correctNotes[2])){
                        misTouchCounter[nowNoteLine]++;
                    }

                    // note: 外側の条件分岐 ioiCounter 計算に利用する．1番目の音符列の IOI を求める際は，befNoteLine は 1つ前の音符列でなく，最後尾の音符列でなければならない．
                    //       内側の条件分岐は，音符列が1列進んだ時，つまり QP ボタンで演奏位置をスキップしていない場合のみ ioiCounter, transitionOneCounter を
                    //       計算するためもの．
                    if((nowNoteLine >= firstNoteLine + 1) && nowNoteLine <= finalNoteLine){
                        if(nowNoteLine - befNoteLine == 1){
                            ioiCounter[nowNoteLine] = parseInt(midiDataColRow.data[idx][1], 10) - parseInt(midiDataColRow.data[befNoteLineIdx][1], 10);
                            transitionOneCounter[nowNoteLine]++;
                        }
                    }else if(nowNoteLine == firstNoteLine){
                        if(befNoteLine == finalNoteLine){
                            ioiCounter[nowNoteLine] = parseInt(midiDataColRow.data[idx][1], 10) - parseInt(midiDataColRow.data[befNoteLineIdx][1], 10);
                            transitionOneCounter[nowNoteLine]++;
                        }
                    }
                }
                
                befNoteLineIdx = idx;
                befNoteLine    = nowNoteLine;
            }
        }
        
        // ioiCounter, velocityCounter を正規化する．
        // note: IOI は音符列が 1 つだけ遷移した時 (例: 音符列0 → 音符列1) のみ算出し格納することとしている．
        //       そのため，transitionOneCounter で正規化している．
        //       これは，音符列が1つ以上違う箇所に遷移した際の IOI を算出しても意味がないからである．
        //       一方，velocityCounter 音符列が1つ以上遷移しても問題ない (velocity はその音符列だけの情報で算出可能だから) ため．
        //       noteLineCounter で正規化している．
        // idx の範囲は ioiCounter と velocityCounter で共通なので，同じループで処理しても問題無い．
        for (var idx in ioiCounter){    
            ioiCounter[idx]      = Math.floor(ioiCounter[idx]      / transitionOneCounter[idx]);
            velocityCounter[idx] = Math.floor(velocityCounter[idx] / noteLineCounter[idx]);
        }
                
        counterTest = function(){
            
            var transitionOneCounterSum = 0;
            
            console.log('------------------------------ noteLineCounter ----------------------------');
            for(var idx in noteLineCounter){
                process.stdout.write(noteLineCounter[idx] + ', ');
                if(idx == noteLineCounter.length-1) process.stdout.write(noteLineCounter[idx] + '\n');
            }
            console.log('-------------------------------- ioiCounter -------------------------------');
            for(var idx in ioiCounter){
                process.stdout.write(ioiCounter[idx] + ', ');
                if(idx == ioiCounter.length-1) process.stdout.write(ioiCounter[idx] + '\n');
            }
            console.log('--------------------------- transitionOneCounter --------------------------');
            for(var idx in transitionOneCounter){
                transitionOneCounterSum += transitionOneCounter[idx]
                process.stdout.write(transitionOneCounter[idx] + ', ');
                if(idx == transitionOneCounter.length-1) process.stdout.write(transitionOneCounter[idx] + '\n');
            }
            console.log('transitionOneCounterSum: ' + transitionOneCounterSum);
            console.log('------------------------------ velocityCounter ----------------------------');
            for(var idx in velocityCounter){
                process.stdout.write(velocityCounter[idx] + ', ');
                if(idx == velocityCounter.length-1) process.stdout.write(velocityCounter[idx] + '\n');
            }
            console.log('------------------------------ misTouchCounter ----------------------------');
            for(var idx in misTouchCounter){
                process.stdout.write(misTouchCounter[idx] + ', ');
                if(idx == misTouchCounter.length-1) process.stdout.write(misTouchCounter[idx] + '\n');
            }
        };
        // counterTest();
        
        practiceData[midiDataColRow.fileName] = {
           noteLineCounter:noteLineCounter, ioiCounter:ioiCounter, misTouchCounter:misTouchCounter,
           transitionOneCounter:transitionOneCounter, velocityCounter:velocityCounter,
           queuePointButtonCounter:queuePointButtonCounter, playMusicButtonCounter:playMusicButtonCounter,
           practiceModeBtnCounter:practiceModeBtnCounter
        };
        
        return practiceData;
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    getArraySum = function(array){

        var arraySum = 0;
        
        for (var idx in array){
            if (!isNaN(array[idx])) arraySum += array[idx];
        }
        
        return arraySum;
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    getArrayAve= function(array){
        return parseFloat(getArraySum(array)) / parseFloat(array.length)        
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////        
    // array の要素を合計すると 1 になるように値を正規化する関数．
    arrayNomalizer = function(array){  
        
        var arraySum = getArraySum(array); 
        
        if(arraySum > 0){ // 0 による除算をしない．
            for(var idx in array){
                array[idx] = parseFloat(array[idx]) / parseFloat(arraySum);
            };
        }
        
        return array;
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////    
    getPracticeDataVector = function(userRequestedFileNameCPDV){
        
        var practiceData = getPracticeData(userRequestedFileNameCPDV); // getPracticeData は 第1のキーがファイル名になっている (クライアント側でファイル名を識別しやすくするため). 
                                                                       // そのため，noteLineCounter にアクセスするには practiceData[userRequestedFileNameCPDV].noteLineCounter
                                                                       // とする必要がある．        

        // practiceDataVector に不要な打鍵情報を削除．
        delete practiceData[userRequestedFileNameCPDV]['playMusicButtonCounter'];
        delete practiceData[userRequestedFileNameCPDV]['practiceModeBtnCounter'];
                
        // practiceData の打鍵情報を項目ごとに (noteLineCounter, ioiCounter など) 0 - 1 の範囲に正規化.
        for (var prop in practiceData[userRequestedFileNameCPDV]){
            practiceData[userRequestedFileNameCPDV][prop] = arrayNomalizer(practiceData[userRequestedFileNameCPDV][prop]);
            
            // console.log('Sum of ' + prop + ': ' + getArraySum(practiceData[prop]));
            console.log("Sum of '" + prop + "': " + getArraySum(practiceData[userRequestedFileNameCPDV][prop]));
            console.log("Ave of '" + prop + "': " + getArrayAve(practiceData[userRequestedFileNameCPDV][prop]));
        }
        
        return practiceData;
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // note: ファイルロードは，指定されたファイルのみをロードするようにしている．
    //       practiceData DataBase の生成は別モジュールで本モジュールを利用して行う．
    //       これは，本モジュールを client へ移植しやすくするための工夫．
    getPracticeData = function(userRequestedFileName){        
        try{
            var tsvMidiData  = extendedFs.readFileSync('./TsvMidiData/' + userRequestedFileName, 'utf-8'),  
            //  tsvMidiData        = extendedFs.readFileSync('../TsvMidiData/' + userRequestedFileName, 'utf-8'), // moduleTest 時のファイルパス．
                fileNameStrForPuts = 'TsvMidiDataProcessor.js: Processing: ' + userRequestedFileName
            ;
            console.log(fileNameStrForPuts.green);
            return createPracticeData(getMidiDataColRow({fileName:userRequestedFileName, file:tsvMidiData}));
        }catch(e){
            console.log('TsvMidiDataProcessor.js: TsvMidiData の取得に失敗しました．ファイルが存在しない可能性があります．'.red);
            console.log(e);
            return 'error';
        }
    };
    // 複数ファイルを一度に読み込む場合．DataBaseProcessor ではこのように実装すべきだ．
    /*
    (loadTsvMidiData = function(){
        
        extendedFs.readFilesAsync('../TsvMidiData', 'txt', function(tsvMidiData_arrayLTM, isError){                
            if(isError){
                console.log('error');
            }else{
                
                for (var tsvMidiData_arrayLTM_i = 0; tsvMidiData_arrayLTM_i < 9; tsvMidiData_arrayLTM_i++){
                    console.log(createPracticeData(getMidiDataColRow(tsvMidiData_arrayLTM[tsvMidiData_arrayLTM_i])));
                }
            }
        });
    })();
    */

    /*
    (createPracticeDataJson = function(){
        
        var dataNames = ['Shun Ohkura_day-6_data-6', 'Iwabuchi_day-11_data-11', 'Hayashi_day-5_data-5', 'Yamamoto_day-9_data-9', 
                         'KentaroUeda_day-6_data-6', 'Mito_day-9_data-9', 'Kobayashi1_day-3_data-3', 'Izumi_day-6_data-6'];
        
    })();
    */
    
    return {'getPracticeData':getPracticeData, 'getPracticeDataVector':getPracticeDataVector};
    
})();
///////////////////////////////////////////////
///////////////////////////////////////////////
/*
(function moduleTest(){
    'use strict'
    TsvMidiDataProcessor('TsvMidiData_dizn_2015-1-20_23-11-00-0000_practiceDay-1.txt');
})();
*/