// fs を継承し拡張した ExtendedFs モジュール．
module.exports = (function(){
    'use strict'
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    var constructor, getFileNameListAsync, readFileSync, readFilesAsync,
        colors     = require('colors'), 
	    ExtendedFs = require('fs')
    ;    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // 指定されたディレクトリ内の指定された拡張子のファイルを配列に格納し返却．
    // extention は . 抜きの拡張子を入れる．
    // cakkback はファイル名が取得された際に実行される．引数に fileNameList，
    // 第2引数に isError (error 発生時 true) をとる．
    // 指定フォルダのファイル一覧を取得... http://blog.panicblanket.com/archives/2465
    // !!! フォルダ内にディレクトリがあると正常に動作しないことに注意 !!!
    ExtendedFs.getFileNameListAsync = function(directryPath, extention, callback){
        
        ExtendedFs.readdir(directryPath, function(err, files){
            if (err){
                console.log(err);
                console.log('ExtendedFs.js: ファイル名を取得できませんでした．'.red);
                callback(null, true); // 第2引数は error 通知変数 isError．error 発生時は true. 
            }else{
                var fileNameList = [];

                for(var files_i in files){ // files_i には指定されたディレクトリのファイルネームが格納されている．
                    fileNameList.push(files[files_i]);
                }

                for (var fileNameList_i in fileNameList){

                    var fileExtention, extactedFileNameList; // 指定された拡張子以外のファイルを除去したファイル名リスト
                    // ファイル名から拡張子を抽出
                    fileExtention = fileNameList[fileNameList_i].split('.');
                    fileExtention = fileExtention[fileExtention.length - 1];

                    if(fileExtention != extention){
                        fileNameList.splice( fileNameList_i , 1 ) ;
                    }                
                }
                callback(fileNameList, false);
            }
    
        });
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // @return: array [{fileName:'fileName', file:fileData}, {fileName:'fileName', file:fileData}]
    // note   : directry path を指定する際，末尾に '/' を付けずに実行しなければならない. 
    // callback にファイルデータが格納された配列が渡される．第2引数は error が発生したかを示す bool 値 isError.
    ExtendedFs.readFilesAsync = function(directryPathRFA, extentionRFA, callback){
        // fileNameList には指定された拡張子を持つファイル名のみが格納されている．
        ExtendedFs.getFileNameListAsync(directryPathRFA, extentionRFA, function(fNameList, isError){
            
            if(isError){
                console.log('ExtendedFs.js: ファイル名を取得できず，readFilesAsync を正常に実行できませんでした．'.red);
                callback(null, true); // error 発生時は第2引数は true.
            }else{
                var fileDataList = [];

                for(var file_i in fNameList){
                    try{
                        var filePath = String() + directryPathRFA + '/' + fNameList[file_i];
                        fileDataList.push({
                            'fileName':fNameList[file_i],
                            'file':ExtendedFs.readFileSync(filePath, 'utf-8')
                        });
                    }catch(e){
                        console.log(e);
                        console.log('ExtendedFs.js: dhirectry path の末尾に / が付いている可能性があります．除去してください．'.red);
                    }
                }
                callback(fileDataList, false);
            }
            
        });
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    return ExtendedFs;
})();