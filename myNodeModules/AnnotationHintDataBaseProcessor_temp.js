// AnnotationHintDataBase の初期化，更新を行うモジュール．
// このモジュールは json を db として利用しているため，loadDataBase または uppdateDataBaseAsync で
// db をメモリに読み出してから利用すること．
// ★ UserDataBase の例 (2016/4/26時点，一部のみ切出)
/*
        {
            "0": { // uppdateDataBaseAsync では key: chunkMiddleLine でアクセスしている．
                "patternChunk": {}, // uppdateDataBaseAsync では key: chunkType でアクセスしている．
                "phraseChunk" : {},
                "hardChunk"   : {},
                "summaryChunk": {
                    "Iwabuchi": {  // ユーザ名．uppdateDataBaseAsync では key: userName でアクセスしている．
                        "1": {     // 練習日．　uppdateDataBaseAsync では key: practiceDay でアクセスしている．
                            "2016-4-26_14-35-49-0973": { // 練習日の日付．これがないと，1日に複数回練習した際にデータが上書きされる．
                                "summaryChunk_0": { // uppdateDataBaseAsync では key: chunkData_i でアクセスしている．
                                    "chunkDomId": "summaryChunk_0",
                                    "left"  : 1103,
                                    "top"   : 592,
                                    "width" : 118,
                                    "height": 21,
                                    "stringScoreCol"   : "1",
                                    "chunkMiddleAxisY" : 575,
                                    "chunkType"        : "summary",
                                    "chunkHeadLine"    : 0,
                                    "chunkTailLine"    : 0,
                                    "chunkMiddleLine"  : 0,
                                    "parentChunk" : null,
                                    "good"        : null,
                                    "chunkAnnotationText": "今日の目標としてまず少しでも進めるように考えていた。"
                                }
                            }
                        }
                    }
                }
            }
         }
 */
// todo: AnnotationHintDataBase.json を mongoDB に移植．
//       その際は AnnotationHintDataBase.json を構成する initAnnotationHintDataBase，
//       json を更新する uppdateDataBaseAsync，それらを json として保存する saveDataBaseAsJson 以外は不要になるかもしれない．
//////////////////////////////////////////////
//////////////////////////////////////////////
module.exports = (function(){ // node module として利用する際はこちらを有効化
// var AnnotationHintDataBaseProcessor = function(){ // moduleTest の際はこちらを有効化
    'use strict'
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    var extendedFs         = require('./ExtendedFs.js'),
        // noteLinePosition の scoreCol(音符列の何段目までが譜面の何段目に格納されているかの情報を格納) の中から，
        // 最後尾の譜面段の最後尾の音符列 (key: end) を取り出す．つまり，音符列の最大値を取得する．
        // noteLineLength は複数のメソッドで利用するため，モジュールグローバルスコープで宣言．
        colors             = require('colors'), // 色付きで console.log するモジュール．
        getCurretDirectory = require('./GetCurretDirectory.js'),
        currentDirectory   = null, 
        noteLinePosition   = null,
        noteLineLength     = null,
        uppdateDataBaseAsync, loadDataBase, search, getAnnotationHintDB_Async,
        annotationHintDataBase = {}  // note: search メソッドで毎回 annotationHintDataBase を引数として与えると煩雑になるため，
                                     //       モジュールグローバル変数として annotationHintDataBase を宣言した．
    ;
    currentDirectory = require('./GetCurretDirectory.js')(extendedFs.realpathSync('./'));
    (function pathCheckForScoreDataParser(){
        if(currentDirectory == 'ChunkPianoSystem'){
            console.log(extendedFs.realpathSync('./'));
            console.log(process.argv[1]);
            noteLinePosition = require('./ScoreDataParser.js')('./ScoreData/TurcoScore.json').getNoteLinePosition();
        }else if(currentDirectory == 'myNodeModules'){
            noteLinePosition = require('./ScoreDataParser.js')('../ScoreData/TurcoScore.json').getNoteLinePosition();
        }    
        noteLineLength   = parseInt(noteLinePosition.scoreCol[String() + Object.keys(noteLinePosition.scoreCol).length - 1].end, 10);        
    })();
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // annotationHintDataBase を更新しメモリ上に展開するモジュール．
    // 更新に失敗した際は loadDataBase で annotationHintDataBase をメモリ上に展開する．
    // @param callback: function. DB 更新，メモリ展開を完了した際に実行される. 
    uppdateDataBaseAsync = function(callback){
        
        var constructor, createAnnotationHintDataBase, bootUpWithLoadDataBase, saveDataBaseAsJson, getDateFromChunkDataFileName;
        
        // uppdateDataBaseAsync でerror が発生した際は loadDataBase で annotationHintDataBase をメモリ上に展開．
        // ここでバグが発生しても，annotationHint データベース更新が不能になる以外のトラブルを
        // 起こさない(フォールトトレラント)．
        bootUpWithLoadDataBase = function(callback){
            loadDataBase(callback);
            console.log('AnnotationHintDataBaseProcessor.js: ChunkData フォルダの json ファイルの取得に失敗しました．'.red);
            console.log('AnnotationHintDataBaseProcessor.js: 代わりに loadDataBase で起動します...'.red);
        };        
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        saveDataBaseAsJson = function(callback){
            
            var strinfiedAnnotationHintDataBase     = JSON.stringify(annotationHintDataBase),
                pathForSavingAnnotationHintDataBase = null
            ;
            
            (function pathCheckForSaveDataBaseAsJson(){
                if(currentDirectory == 'ChunkPianoSystem'){
                    pathForSavingAnnotationHintDataBase = './AnnotationHintDataBase'
                }else if(currentDirectory == 'myNodeModules'){
                    pathForSavingAnnotationHintDataBase = '../AnnotationHintDataBase'                
                }    
            })();
            
            // extendedFs.writeFile('../AnnotationHintDataBase.json', strinfiedAnnotationHintDataBase, function(err){ // moduleTest 時のファイルパス
            extendedFs.writeFile( pathForSavingAnnotationHintDataBase + '.json', strinfiedAnnotationHintDataBase, function(err){
               if(err){
                   console.log(err);
               }else{
                   console.log('AnnotationHintDataBaseProcessor.js: AnnotationHintDataBase updated.'.green);
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
        getDateFromChunkDataFileName = function(chunkDataFileName){
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
        createAnnotationHintDataBase = function(){

            var pathToChunkData = null;
            
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
            
            (function pathCheckForCreateAnnotationHintDataBase(){
                if(currentDirectory == 'ChunkPianoSystem'){
                    pathToChunkData = './ChunkData';
                }else if(currentDirectory == 'myNodeModules'){
                    pathToChunkData = '../ChunkData';
                }    
            })();
            //////////////////////////////////////////////
            //////////////////////////////////////////////
            // extendedFs.readFilesAsync('../ChunkData', 'json', function(chunkData){  // moduleTest 時のファイルパス
            // readFilesAsync は [{fileName:'fileName', file:fileData}, {fileName:'fileName', file:fileData}] を返却する．
            extendedFs.readFilesAsync(pathToChunkData, 'json', function(chunkData, isError){

                var isErrorOccured = isError; // try - catch で error が発生したかのチェックを行うため，isError とは別に変数を宣言した．

                // (1) まず，readFilesAsync で取得された chunkData ファイルを1つずつ読込. 
                if(isErrorOccured){
                    // readFilesAsync でエラーが発生した際は，既に構成済みの JSON DB をメモリ上に展開．
                    if(callback) bootUpWithLoadDataBase(callback);
                }else{

                    for(var file_i in chunkData){
                        try{
                            var userName, practiceDay, // userName, practiceDay, date は chunkData を parse した後に格納すること．
                                date = null            // DB の key は practiceDay までの詳細度では同じ practiceDay のデータが複数ある際に上書きされてしまう．
                                                       // それを避けるために DB には日時 date も利用する．
                            ;

                            chunkData[file_i].file = JSON.parse(chunkData[file_i].file);
                            userName = chunkData[file_i].file.userName;

                            // *** 以下の処理は，chunkData を JSON.parse した後に実行しなければならない．***
                            // todo: parseJson という関数を作成し，parse 完了後に callback で処理するようにする? 

                            date        = getDateFromChunkDataFileName(chunkData[file_i].fileName);                        
                            practiceDay = String() + 'practiceDay-' + chunkData[file_i].file.practiceDay;

                            // (2) ファイル内の chunkData を1つずつ読み込み，データベースに格納．
                            try{
                                for(var chunkData_i in chunkData[file_i].file.chunkData){
                                    // chunkMiddleLine は chunk の中心位置と対応する音符列番号．これを annotation hint のインデックスとする．
                                    // オブジェクトアクセスを減らすために変数に格納．
                                    // オブジェクトのキーにするため文字列化．
                                    var chunkMiddleLine = String() + chunkData[file_i].file.chunkData[chunkData_i].chunkMiddleLine,
                                        // chunkData obj の chunkType は hard や pattern のようになっているので，'Chunk' を末尾に連結．
                                        chunkType       = String() + chunkData[file_i].file.chunkData[chunkData_i].chunkType + 'Chunk'
                                    ;

                                    // AnnotationHintDataBase の個々の chunkData には file name プロパティを持たせる．
                                    // これは，クライアントで「引用する」ボタンを押された際に，元ファイルに引用数を付与するために利用する．
                                    // 不採用 note: 個々の chunkData に fileName を付与するのではなく，AnnotationHintDataBase の chunkData_i と同レベルに1つだけ 
                                    //             annotationHintDataBase[chunkMiddleLine][chunkType][userName][fileName] = chunkData[file_i].fileName;
                                    // 　　　       と与える方がデータ量が減り，良いと思われる．
                                    // note: 上記のように考えたが，クライアントの annotationHintDomRenderer.js では DB のキーを for - in ループで処理しているため，
                                    //       key: practiceDay と同レベルに key: fileName を付与すると例外処理を行わなければならない．
                                    //       データ量は大きくなるが，userName や fileName などの DB 検索キー情報は 個々の chunkData に付与した方が
                                    //       クライアントで処理しやすい．
                                    chunkData[file_i].file.chunkData[chunkData_i].fileName = chunkData[file_i].fileName;

                                    // annotationHintDataBase[chunkMiddleLine][chunkType] 以降のデータが undefined の場合は，
                                    // キー毎にオブジェクトを定義し初期化する．これを行わないと annotationHintDataBase[chunkMiddleLine][chunkType] 以降の
                                    // キーを  annotationHintDataBase[chunkMiddleLine][chunkType][userName][practiceDay][chunkData_i] = ~ のように追加できない．
                                    if(annotationHintDataBase[chunkMiddleLine][chunkType][userName] == undefined){
                                        annotationHintDataBase[chunkMiddleLine][chunkType][userName] = {};    
                                    }
                                    if(annotationHintDataBase[chunkMiddleLine][chunkType][userName][practiceDay] == undefined){
                                        annotationHintDataBase[chunkMiddleLine][chunkType][userName][practiceDay] = {};
                                    }
                                    if(annotationHintDataBase[chunkMiddleLine][chunkType][userName][practiceDay][date] == undefined){
                                        annotationHintDataBase[chunkMiddleLine][chunkType][userName][practiceDay][date] = {};
                                    }

                                    // chunkData を DataBase に追加．
                                    annotationHintDataBase[chunkMiddleLine][chunkType][userName][practiceDay][date][chunkData_i] =
                                        chunkData[file_i].file.chunkData[chunkData_i]
                                    ;

                                }
                            }catch(e){
                                if(callback) bootUpWithLoadDataBase(callback);    
                                console.log(e);
                                isErrorOccured = true;
                                console.log('AnnotationHintDataBaseProcessor.js: chunkData個別処理でエラー．annotationHintDataBase を更新できません．'.red);
                                break;
                            }
                        }catch(e){
                            if(callback) bootUpWithLoadDataBase(callback);
                            console.log(e);
                            isErrorOccured = true;
                            console.log('AnnotationHintDataBaseProcessor.js: chunkData全体処理でエラー．annotationHintDataBase を更新できません．'.red);
                            break;
                        }

                    }
                    // note: 最新の annotationHintDataBase はメモリ内で構成されているため，最新の database を saveDataBaseAsJson で
                    //       保存してから更に loadDataBase する必要はない．保存するだけで良い．
                    // note: extendedFs.readFilesAsync, try - catch で error が発生した際に isErrorOccured = true となる．
                    //       その際は DB の保存は行わない．
                    if(!isErrorOccured){
                        if(callback) saveDataBaseAsJson(callback);
                    }
                }
            });
        };
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        (function constructor(){
            createAnnotationHintDataBase();
        })();
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // AnnotationHintDataBase の検索用メソッド．
    // 引数 chunkData 内のチャンク中央の音符列番号 chunkMiddleLine などをキーに関連するアノテーションを検索．
    // 引数 option はクライアントの ChunkPianoSystem_client.annotationDomRenderer.js で指定された検索オプション．
    // option の例...
    /*
        annotationHintSearchOption = { // サーバで annotationHint をサーチする際のオプション
           patternChunk:true,    // patternChunk をサーチ対象に入れるか否か．
           phraseChunk :true,
           hardChunk   :true,
           summaryChunk:true,
           margin      :5,       // chunk の chunkMiddleLine から +- いくつまで検索対象に入れるか．
           order       :'noteLine' // todo: 何を優先して検索するかを指定して検索できるようにする．noteLine は db の noteLine インデックス順にそのまま返却するモード．
        }
    */
    search = function(chunkData, option){
        try{
            // chunkData がない時，もしくは loadDataBase で error が発生した時は annotationHintDataBase が空になる．
            // その際に search された際は error を返す．
            if(Object.keys(annotationHintDataBase).length == 0){
                return 'error';
            }else{
                
                if(option.order == 'noteLine'){
                    var searchRangeMin = chunkData.chunkMiddleLine - option.margin, // チャンクの中央音符列位置を基に検索範囲を計算.
                        searchRangeMax = chunkData.chunkMiddleLine + option.margin,
                        searchResult   = {},
                        tmp_searchedNoteLine
                    ;
                    // console.log(annotationHintDataBase);

                    // searchRangeMin が 0 以下の場合は検索不可なので 0 に修正
                    if(searchRangeMin < 0){
                        searchRangeMin = 0;
                    }
                    // TurcoScore の場合は searchRangeMax が 82 以上の場合は検索不可なので 82 に修正．        
                    if(searchRangeMax > noteLineLength){
                        searchRangeMax = noteLineLength;   
                    }

                    // console.log(chunkData);
                    // console.log(option);
                    // console.log('searchRangeMin: ' + searchRangeMin);
                    // console.log('searchRangeMax: ' + searchRangeMax);      

                    for(var searchRenge = searchRangeMin; searchRenge <= searchRangeMax; searchRenge++){
                        // console.log();
                        tmp_searchedNoteLine = annotationHintDataBase[String() + searchRenge];

                        if(option.patternChunk){
                            if(Object.keys(tmp_searchedNoteLine.patternChunk).length != 0){
                                // 検索オプションで patternChunk が有効化され，該当音列 の annotationHintDataBase の patternChunk が空でない時は
                                // 検索結果に当該データを格納する．
                                // phraseChunk, hardChunk, summaryChunk についても同様の処理を行っている．
                                // todo: 類似処理が反復されているので関数化する． 
                                searchResult[String() + searchRenge] = {};
                                searchResult[String() + searchRenge]['patternChunk'] = tmp_searchedNoteLine.patternChunk;
                            }
                        }
                        if(option.phraseChunk){
                            if(Object.keys(tmp_searchedNoteLine.phraseChunk).length != 0){
                                searchResult[String() + searchRenge] = {};
                                searchResult[String() + searchRenge]['phraseChunk'] = tmp_searchedNoteLine.phraseChunk;
                            }
                        }           
                        if(option.hardChunk){
                            if(Object.keys(tmp_searchedNoteLine.hardChunk).length != 0){
                                searchResult[String() + searchRenge] = {};
                                searchResult[String() + searchRenge]['hardChunk'] = tmp_searchedNoteLine.hardChunk;
                            }
                        }
                        if(option.summaryChunk){
                            if(Object.keys(tmp_searchedNoteLine.summaryChunk).length != 0){
                                searchResult[String() + searchRenge] = {};
                                searchResult[String() + searchRenge]['summaryChunk'] = tmp_searchedNoteLine.summaryChunk;
                            }
                        }
                    }
                }
                // 条件に適合する検索結果が無い場合は {} が return される．
                // console.log(searchResult);
                return searchResult;
            }
        }catch(e){
            console.log('AnnotationHintDataBaseProcessor.js: Error occured in AnnotationHintDataBaseProcessor.search'.red);
            return 'error'; // 検索操作中に error が発生した際は server に文字列を返却し伝達．
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // uppdateDataBaseAsync をせずに，既に構成されている AnnotationHintDataBase.json をロードする．
    // AnnotationHintDataBase が肥大化し構成に時間がかかる場合は loadDataBase を利用し，
    // uppdateDataBaseAsync は一定時間毎に行うようにする．
    loadDataBase = function(callback){
        try{

            (function pathCheckForLoadDataBase(){
                if(currentDirectory == 'ChunkPianoSystem'){
                    annotationHintDataBase = extendedFs.readFileSync('./AnnotationHintDataBase.json', 'utf-8');
                }else if(currentDirectory == 'myNodeModules'){
                    annotationHintDataBase = extendedFs.readFileSync('../AnnotationHintDataBase.json', 'utf-8');
                }    
            })();
                        
            // annotationHintDataBase = extendedFs.readFileSync('../UserDataBase.json', 'utf-8'); // moduleTest 時のファイルパス
            annotationHintDataBase = JSON.parse(annotationHintDataBase);
            if(callback) callback();
            console.log('AnnotationHintDataBaseProcessor.js: AnnotationHintDataBase loaded.'.green);
        }catch(e){
            if(callback) callback();
            console.log(e);
            console.log('AnnotationHintDataBaseProcessor.js: Error occured in loadDataBase.'.red);
            console.log('AnnotationHintDataBaseProcessor.js: AnnotationHintDataBase が構成されていない可能性があります.'.red);
            console.log('AnnotationHintDataBaseProcessor.js: uppdateDataBaseAsync で起動してください．'.red);
            // ここで updateDataBase で起動するようにすると，updateDataBase で error が発生した際に
            // loadDataBase が起動するようになっているので，無限ループに陥る可能性がある．
            // そのため，loadDataBase が失敗した際は AnnotationHintDataBase のメモリ展開を行わず
            // 機能を低下させ server を実行する．
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    getAnnotationHintDB_Async = function(callback){
        uppdateDataBaseAsync(function(){
            if(callback) callback(annotationHintDataBase);
        });
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    return {loadDataBase:loadDataBase, uppdateDataBaseAsync:uppdateDataBaseAsync, search:search, getAnnotationHintDB_Async:getAnnotationHintDB_Async};
// }; // moduleTest の際はこちらを有効化.
})(); // node module として利用する際はこちらを有効化. 
//////////////////////////////////////////////
//////////////////////////////////////////////
/*
(function moduleTest(){
    var ahdbp = AnnotationHintDataBaseProcessor();
    ahdbp.uppdateDataBaseAsync();
})();
*/