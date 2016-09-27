// ScoreData 内の指定された譜面データをパースするモジュール．
// このモジュールの処理にはあまり意味がない．ScoreData をそのままクライアントに渡し，処理できるようにしておく．
// 利用例: var scoreDataParser = require('./myNodeModules/ScoreDataParser.js')('./ScoreData/TurcoScore.json');
module.exports = function(scoreFilePath){
// var ScoreDataPaerser = function(scoreFilePath){ // モジュール単体テストのための記述．
    'use strict'
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    var extendedFs = require('./ExtendedFs.js'),
        constructor, scoreDataJson, getNoteLinePosition, getRawData, saveNoteLinePosition
    ;
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    getNoteLinePosition = function(){
        
        var noteLinePositionObj = {
                noteLine   :[], // ここに各音符列番号ごとに正解打鍵情報などの情報を格納．
                upperY     :scoreDataJson.scoreRow.upperAxisY,
                lowerY     :scoreDataJson.scoreRow.lowerAxisY,
                middleAxisY:null, // チャンク先頭位置が上段か下段かの判定に利用
                scoreCol   :{}
            },
            scoreColCounter     = 0,
            isScoreColFirstLine = true,
            scoreColFirstLine   = null
        ;
        
        // 譜面の上段，下段の中間の y 座標を取得．チャンクで頭出しする際，上段，下段の判定に利用．
        noteLinePositionObj.middleAxisY = Math.floor(noteLinePositionObj.upperY + 
                                                     ((noteLinePositionObj.lowerY - noteLinePositionObj.upperY) / 2)
                                                     )
        ;
                
        for(var notesCol_i in scoreDataJson.notesCol){
            
            var intNotesCol_i = parseInt(notesCol_i, 10), 
                beforeStringNotesCol_i = null
            ;
            ///////////////////////////////////////////////
            ///////////////////////////////////////////////
            // 音符列番号のどこからどこまでが譜面の1段目，2段目かをデータ化する．
            // 出力例: { '1': { start: '0', end: '48' }, '2': { start: '49', end: 82 } }
            // 音符列の 最新 y 座標(scoreDataJson.notesCol[notesCol_i].axisY) と
            // 1つ前の音符列のy座標(scoreDataJson.notesCol[beforeStringNotesCol_i]) を
            // 比較する必要があるため if 条件文に (intNotesCol_i > 0) を加えている．
            // 音符列番号のどこからどこまでが譜面の1段目，2段目かをデータ化する処理のため，
            // 「音符番号が 0 から始まるべきなのに 1から始まる」という問題は気にしなくて良い．
            if((intNotesCol_i > 0) && (intNotesCol_i < (Object.keys(scoreDataJson.notesCol).length -1))){
                beforeStringNotesCol_i = String() + (intNotesCol_i-1) // オブジェクトのキーにするために String に変換．
                // 各譜面の段の最初の音符番号を抽出．
                if(isScoreColFirstLine){ 
                    scoreColFirstLine  = beforeStringNotesCol_i;
                    isScoreColFirstLine = false;
                }
                // 各譜面の段の最後の音符番号を抽出． 
                // 音符列の y 座標(scoreDataJson.notesCol[notesCol_i].axisY)は列の中央 y 座標 middleAxisY になっている．
                // 最新の音符列の 最新 y 座標(scoreDataJson.notesCol[notesCol_i].axisY) と
                // これが1つ前の音符列のy座標(scoreDataJson.notesCol[beforeStringNotesCol_i])
                // が異なった瞬間が段が切り替わった瞬間となる．
                if(scoreDataJson.notesCol[notesCol_i].axisY != scoreDataJson.notesCol[beforeStringNotesCol_i].axisY){
                    noteLinePositionObj.scoreCol[scoreColCounter] = {'start':parseInt(scoreColFirstLine, 10), 'end':parseInt(beforeStringNotesCol_i, 10)};
                    isScoreColFirstLine = true;
                    scoreColCounter++
                }
            // 譜面の最後の音符番号のみ別に処理する．次の譜面の段がないため．
            }else if(notesCol_i == (Object.keys(scoreDataJson.notesCol).length -1)){
                noteLinePositionObj.scoreCol[scoreColCounter] = {'start':parseInt(scoreColFirstLine, 10), 'end':parseInt(intNotesCol_i, 10)};
            }
            ///////////////////////////////////////////////
            ///////////////////////////////////////////////
            // ScoreData から音符列の x 座標，y 座標のみを抽出し配列に格納．
            // この処理は push を利用するか迷ったが，push では ScoreData の音符番号が 0 から始まっていない場合，
            // 座標データとの食い違いが発生する．notesCol_i をインデックスに利用すれば バグ発生 or undefined格納により
            // 食い違いに気づくことができる．
            // 音符個別の y 座標は取得しない．音符個別の y 座標も取得したい場合は，getRawData を利用すべし．
            
            noteLinePositionObj.noteLine[notesCol_i] = {
                'note-0':scoreDataJson.notesCol[notesCol_i]['note-0'],
                'note-1':scoreDataJson.notesCol[notesCol_i]['note-1'],
                'note-2':scoreDataJson.notesCol[notesCol_i]['note-2'],
                'axisX' :scoreDataJson.notesCol[notesCol_i].axisX,                                       
                'axisY' :scoreDataJson.notesCol[notesCol_i].axisY
            };
        }
                
        return noteLinePositionObj; 
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // 本メソッドの実行の前に getNoteLinePosition を実行する必要はない．
    saveNoteLinePosition = function(){
        var noteLinePositionObjSNP = getNoteLinePosition();
        noteLinePositionObjSNP = JSON.stringify(noteLinePositionObjSNP);
        
        extendedFs.writeFile('ParsedScoreData.json', noteLinePositionObjSNP, function(err){
           if(err){
               console.log(err);
           }else{
               console.log('data has written!');
           }
        });
    };
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    // ScoreData の生データを返す．
    getRawData = function(){
        return scoreDataJson; 
    };
    // constructor が行うのは json データのロードのみ
    (constructor = function(){
        scoreDataJson = extendedFs.readFileSync(scoreFilePath, 'utf-8');
        scoreDataJson = JSON.parse(scoreDataJson);
        // console.log(scoreDataJson);
    })();
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    return{getNoteLinePosition:getNoteLinePosition, getRawData:getRawData, saveNoteLinePosition:saveNoteLinePosition};
};
///////////////////////////////////////////////
///////////////////////////////////////////////
/*
(function moduleTest(){
    var scoreDataParser = ScoreDataPaerser('../ScoreData/TurcoScore.json');
    scoreDataParser.saveNoteLinePosition();
})();
*/