module.exports = (function(){ 
    'use strict';
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    var extendedFs         = require('./ExtendedFs.js'),
        colors             = require('colors'), // 色付きで console.log するモジュール．
        // noteLinePosition   = require('./ScoreDataParser.js')('./ScoreData/TurcoScore.json').getNoteLinePosition(),
        // noteLineLength     = parseInt(noteLinePosition.scoreCol[String() + Object.keys(noteLinePosition.scoreCol).length - 1].end, 10),
        uppdateDataBaseAsync, loadDataBase, getTsvMidiDataDB_Async,
        tsvMidiDataDataBase = {}     
    ;
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    uppdateDataBaseAsync = function(callback){
        
        var bootUpWithLoadDataBase, saveDataBaseAsJson, getMetaDataFromFileName;
        
        // uppdateDataBaseAsync でerror が発生した際は loadDataBase で annotationHintDataBase をメモリ上に展開．
        // ここでバグが発生しても，annotationHint データベース更新が不能になる以外のトラブルを
        // 起こさない(フォールトトレラント)．
        bootUpWithLoadDataBase = function(callback){
            callback ? loadDataBase(callback) : loadDataBase();    
            console.log('TsvMidiDataDataBaseProcessor.js: TsvMidiData フォルダの json ファイルの取得に失敗しました．'.red);
            console.log('TsvMidiDataDataBaseProcessor.js: 代わりに loadDataBase で起動します...'.red);
        };
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        saveDataBaseAsJson = function(callback){
            
            var strinfiedTsvMidiDataDataBase = JSON.stringify(tsvMidiDataDataBase);

            // extendedFs.writeFile('../AnnotationHintDataBase.json', strinfiedAnnotationHintDataBase, function(err){ // moduleTest 時のファイルパス
            extendedFs.writeFile( './TsvMidiDataDataBase.json', strinfiedAnnotationHintDataBase, function(err){
               if(err){
                   console.log(err);
               }else{
                   console.log('TsvMidiDataDataBaseProcessor.js: AnnotationHintDataBase updated.'.green);
                   if(callback) callback();
               }
            });  
        };
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        // fileName から練習時の日付を抽出する．
        // note: annotationHintDataBase にデータを格納する際は，練習日だけでインデクシングしてしまうと，同じ日に何度も練習したデータが上書きされてします．
        //       これを避けるために，練習時の日付でさらにインデクシングする．
        // @return: string. 練習日の日付．例: 2016-3-28_13-16-52-0766
        getMetaDataFromFileName = function(fileName){
            var splitedChunkDataFileName = chunkDataFileName.split('_'),
                dataGeneratedDate        = null
            ;
            // splitedChunkDataFileName[0]... ファイルの種類，　　例: ChunkPianoData
            // splitedChunkDataFileName[1]... ファイルのユーザ名，例: Iwabuchi
            // splitedChunkDataFileName[2]... ファイルの作成日，　例: 2016-3-28
            // splitedChunkDataFileName[3]... ファイルの作成時刻，例: 13-16-52-0766
            dataGeneratedDate = String() + splitedChunkDataFileName[2] + '_' + splitedChunkDataFileName[3];
            // console.log(dataGeneratedDate);
            return dataGeneratedDate;
        };
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        (function createAnnotationHintDataBase(){
            
            var tsvMidiDataFileNameList;
            
            extendedFs.getFileNameListAsync('../TsvMidiData', 'txt', function(fileNameList){
                console.log(fileNameList);
                tsvMidiDataFileNameList = fileNameList;
                
            });
            
            /*
            // noteLinePosition から全音符番号を取得し，annotationHintDataBase の雛形を生成するモジュール．
            // done: クライアントサイドで chunkDom に自身が所属する譜面行番号を付与する処理を行う． 
            (function initAnnotationHintDataBase(){
                
                for(var annoHintDB_noteLine_i = 0; annoHintDB_noteLine_i <= noteLineLength; annoHintDB_noteLine_i++){
                    annotationHintDataBase[String() + annoHintDB_noteLine_i] = {
                        patternChunk:{}, // 後で変数を利用してオブジェクトキーを追加するので null で初期化してはいけない．
                        phraseChunk :{}, // null では annotationHintDataBase[chunkMiddleLine][chunkType][userName] == ~~ のようにキーを追加できない．
                        hardChunk   :{},
                        summaryChunk:{}
                    };
                }
            })();
            
            // readFilesAsync は [{fileName:'fileName', file:fileData}, {fileName:'fileName', file:fileData}] を返却する．
            extendedFs.readFilesAsync('./ChunkData', 'json', function(chunkData, isError){
            });
            */
            
        })();
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // uppdateDataBaseAsync をせずに，既に構成されている TsvMidiDataDataBase.json をロードする．
    // TsvMidiDataDataBase が肥大化し構成に時間がかかる場合は loadDataBase を利用し，
    // uppdateDataBaseAsync は一定時間毎に行うようにする．
    loadDataBase = function(callback){
        try{
            tsvMidiDataDataBase = extendedFs.readFileSync('./TsvMidiDataDataBase.json', 'utf-8');
            tsvMidiDataDataBase = JSON.parse(tsvMidiDataDataBase);
            if(callback) callback();
            console.log('TsvMidiDataDataBaseProcessor.js: TsvMidiDataDataBase loaded.'.green);
        }catch(e){
            if(callback) callback();
            console.log(e);
            console.log('TsvMidiDataDataBaseProcessor.js: Error occured in loadDataBase.'.red);
            console.log('TsvMidiDataDataBaseProcessor.js: TsvMidiDataDataBase が構成されていない可能性があります.'.red);
            console.log('TsvMidiDataDataBaseProcessor.js: uppdateDataBaseAsync で起動してください．'.red);
            // ここで updateDataBase で起動するようにすると，updateDataBase で error が発生した際に
            // loadDataBase が起動するようになっているので，無限ループに陥る可能性がある．
            // そのため，loadDataBase が失敗した際は AnnotationHintDataBase のメモリ展開を行わず
            // 機能を低下させ server を実行する．
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    getTsvMidiDataDB_Async = function(callback){
        uppdateDataBaseAsync(function(){
            if(callback) callback(tsvMidiDataDataBase);
        });
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    return {loadDataBase:loadDataBase, uppdateDataBaseAsync:uppdateDataBaseAsync, getTsvMidiDataDB_Async:getTsvMidiDataDB_Async};
})();

(function moduleTest(){
    var tmddbp = require('./TsvMidiDataDataBaseProcessor.js');
    tmddbp.uppdateDataBaseAsync();
})();
