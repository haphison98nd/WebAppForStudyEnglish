// UserDataBase の初期化，更新を行うモジュール．
// ★ UserDataBase の例  (2016/4/1時点，一部のみ切出)
/*
    {   "dummyUserName":"dummyUserPassword",
        "TanakaTaro"   :"12345",
        "TanakaMinami" :"54321"
    }
*/
// todo: UserDataBase.json を mongoDB に移植．
//       その際は UserDataBase.json を構成する initDataBase や 
//       それを json として保存する saveDataBaseAsJson 以外は不要になるかもしれない．
//////////////////////////////////////////////
//////////////////////////////////////////////
module.exports = (function(){ // node module として利用する際はこちらを有効化
    'use strict';
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    var constructor, initDataBase, loadDataBase, saveDataBaseAsJson, isUserExist, 
        addUserData, removeUserData, authorize,
        extendedFs   = require('./ExtendedFs.js'), 
        colors       = require('colors'),
        userDataBase = {}
    ;
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    initDataBase = function(){ 
        userDataBase = {'dummyUserName':'dummyUserPassword'}; // テンプレート用のダミーデータ．
        saveDataBaseAsJson(); 
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    saveDataBaseAsJson = function(callback){
        extendedFs.writeFile('./UserDataBase.json', JSON.stringify(userDataBase, null, 4), function(err){     // server 実行時のファイルパス
        // extendedFs.writeFile('../UserDataBase.json', strinfiedUserDataBase, function(err){ // moduleTest 時のファイルパス
           if(err){
               console.log(err);
           }else{
               if(callback) callback();
               console.log('UserDataBaseProcessor.js: UserDataBase updated.' .green);
           }
        });
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // json 形式の userDataBase を読み込みパースする．
    loadDataBase = function(callback){
        try{
            userDataBase = extendedFs.readFileSync('./UserDataBase.json', 'utf-8');     // server 実行時のファイルパス
            // userDataBase = extendedFs.readFileSync('../UserDataBase.json', 'utf-8'); // moduleTest 時のファイルパス
            userDataBase = JSON.parse(userDataBase);
            if(callback) callback();
            console.log('UserDataBaseProcessor.js: UserDataBase loaded.'.green);
            // console.log(userDataBase);
        }catch(e){
            console.log(e);
            initDataBase();
            console.log('UserDataBaseProcessor.js: Error occured in loadDataBase.'.red);
            console.log('UserDataBaseProcessor.js: UserDataBase が構成されていない可能性があります.'.red);
            console.log('UserDataBaseProcessor.js: initDataBase を実行し UserDataBase を構成し直しました'.green);
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // userName が既に存在している場合は true, そうでない場合は false を return. 
    isUserExist = function(userName){ 
        return userDataBase.hasOwnProperty(userName) ? true : false;
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // userData は {'userName':'userName', 'userPassword':'userPassword'} という形式を取る．
    // userName が既に存在している場合は false を return. 
    addUserData = function(userData){
        if(isUserExist(userData.userName)){
            var putsStr = 'UserDataBaseProcessor.js: ' + + userData.userName + ' is already exists.';
            console.log(putsStr.red);
            return false;
        }else{
            // 新たな userData を database に追加．
            userDataBase[userData.userName] = userData.userPassword;
            // 最新の userDataBase はメモリ内で構成されているため，最新の database を saveDataBaseAsJson で
            // 保存してから loadDataBase する必要はない．
            saveDataBaseAsJson(); 
            
            console.log('UserDataBaseProcessor.js: added userData to UserDataBase.'.green);
            console.log(userDataBase);
            return true;
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // 削除したいユーザ名を string の userName で引数として与え削除．　
    // 削除対象のキーが存在しない場合は false を return.
    removeUserData = function(userName){
        if(isUserExist(userName) == true){
            
            var putsStr = null;
            
            delete userDataBase[userName];
            // 最新の userDataBase はメモリ内で構成されているため，最新の database を saveDataBaseAsJson で
            // 保存してから loadDataBase する必要はない．
            saveDataBaseAsJson(); 
            
            putsStr = 'UserDataBaseProcessor.js: ' + userName + ' is removed.';
            console.log(putsStr.green);
            console.log(userDataBase);
            return true;
        }else{
            putsStr = 'UserDataBaseProcessor.js: ' + userName + ' is not exsist.';
            console.log(putsStr.red);
            return false;
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // ユーザ認証メソッド．
    // userData は {'userName':'userName', 'userPassword':'userPassword'} という形式を取る．
    // userName が既に存在している場合は false を return. 
    authorize = function(userData){
        
        var authorizeStatusText = '';
        
        if(isUserExist(userData.userName)){
            if(userData.userPassword == userDataBase[userData.userName]){
                authorizeStatusText = 'UserDataBaseProcessor.js: ' + userData.userName + ' is authorized.';
                console.log(authorizeStatusText.green);                        
                return 'authorized'; 
            }else{
                authorizeStatusText = 'UserDataBaseProcessor.js: ' + userData.userName + ' is not authorized.';
                console.log('UserDataBaseProcessor.js: Incorrect user password.'.red);
                console.log(authorizeStatusText.red);
                return 'incorrectUserPassword';
            }
        }else{
            authorizeStatusText = 'UserDataBaseProcessor.js: ' + userData.userName + ' is not exsist.';
            console.log(authorizeStatusText.red);
            return 'userNotExist'; 
        }
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    (constructor = function(){
        // 初期化時に UserDataBase.json をメモリに読込．
        loadDataBase();
        console.log(userDataBase);
    })();
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // initDataBase は moduleTest での実行が主なため，private とした．
    return {addUserData:addUserData, removeUserData:removeUserData, authorize:authorize};
})(); // node module として利用する際はこちらを有効化．
//////////////////////////////////////////////
//////////////////////////////////////////////
/*
(function moduleTest(){
    var udb = UserDataBaseProcessor();
    
    // ユーザデータ追加テスト
    // console.log(udb.addUserData({'userName':'KensukeS', 'userPassword':'12345'}));
    // console.log(udb.addUserData({'userName':'KentaroUeda', 'userPassword':'12345'}));
    // console.log(udb.addUserData({'userName':'K.Ueda', 'userPassword':'12345'}));
    
    // ユーザデータ削除テスト
    // console.log(udb.removeUserData('KentaroUeda'));
    // console.log(udb.removeUserData('KensukeS'));
    
    // ユーザデータ認証テスト
    console.log(udb.authorize({'userName':'KensukeS', 'userPassword':'12345'}));
    // console.log(udb.authorize({'userName':'Ken', 'userPassword':'12345'}));
    console.log(udb.authorize({'userName':'KensukeS', 'userPassword':'1'}));
})();
*/