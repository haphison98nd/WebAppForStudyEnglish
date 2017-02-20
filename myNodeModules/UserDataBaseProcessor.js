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
//       それを json として保存する saveDataBase 以外は不要になるかもしれない．
//////////////////////////////////////////////
//////////////////////////////////////////////
module.exports = (function(){ // node module として利用する際はこちらを有効化
    
    'use strict';

    const redis       = require('redis'),
          // heroku で redis を利用する場合は環境変数を利用.
          // 参考: https://devcenter.heroku.com/articles/heroku-redis#connecting-in-node-js
          redisClient = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) : redis.createClient(),
          userDataBaseHashName = 'UserDataBase'
    ;
    
    let constructor, initDataBase, loadDataBase, saveDataBase, isUserExist, 
        addUserData, removeUserData, authorize,
        extendedFs   = require('./ExtendedFs.js'), 
        colors       = require('colors'),
        userDataBase = {}
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    initDataBase = function(){ 
        userDataBase = {'dummyUserName':'dummyUserPassword'}; // テンプレート用のダミーデータ．
        saveDataBase(); 
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    saveDataBase = function(callback){
        redisClient.set(userDataBaseHashName, JSON.stringify(userDataBase, null, 4));
        console.log('UserDataBaseProcessor.js: UserDataBase updated.' .green);
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // json 形式の userDataBase を読み込みパースする．
    loadDataBase = function(callback){
        redisClient.get(userDataBaseHashName, function (err, obj) {
            console.log(obj);
            if (obj === undefined || obj === null || obj === 'undefined') {
                initDataBase();
                console.log('UserDataBaseProcessor.js: initDataBase を実行し UserDataBase を構成し直しました'.green);
            } else {
                userDataBase = JSON.parse(obj);
                console.log('UserDataBaseProcessor.js: UserDataBase loaded.'.green);
            }
            console.log(userDataBase);
            if(callback) callback();
        });
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // userName が既に存在している場合は true, そうでない場合は false を return. 
    isUserExist = function(userName){ 
        return userDataBase.hasOwnProperty(userName) ? true : false;
    };
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // userData は {'userName':'userName', 'userPassWord':'userPassWord'} という形式を取る．
    // userName が既に存在している場合は false を return. 
    addUserData = function(userData){
        if(isUserExist(userData.userName)){
            var putsStr = 'UserDataBaseProcessor.js: ' + + userData.userName + ' is already exists.';
            console.log(putsStr.red);
            return false;
        }else{
            // 新たな userData を database に追加．
            userDataBase[userData.userName] = userData.userPassWord;
            // 最新の userDataBase はメモリ内で構成されているため，最新の database を saveDataBase で
            // 保存してから loadDataBase する必要はない．
            saveDataBase(); 
            
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
            // 最新の userDataBase はメモリ内で構成されているため，最新の database を saveDataBase で
            // 保存してから loadDataBase する必要はない．
            saveDataBase(); 
            
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
    // userData は {'userName':'userName', 'userPassWord':'userPassWord'} という形式を取る．
    // userName が既に存在している場合は false を return. 
    authorize = function(userData){
        
        var authorizeStatusText = '';
        
        if(isUserExist(userData.userName)){
            if(userData.userPassWord == userDataBase[userData.userName]){
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
    // console.log(udb.addUserData({'userName':'KensukeS', 'userPassWord':'12345'}));
    // console.log(udb.addUserData({'userName':'KentaroUeda', 'userPassWord':'12345'}));
    // console.log(udb.addUserData({'userName':'K.Ueda', 'userPassWord':'12345'}));
    
    // ユーザデータ削除テスト
    // console.log(udb.removeUserData('KentaroUeda'));
    // console.log(udb.removeUserData('KensukeS'));
    
    // ユーザデータ認証テスト
    console.log(udb.authorize({'userName':'KensukeS', 'userPassWord':'12345'}));
    // console.log(udb.authorize({'userName':'Ken', 'userPassWord':'12345'}));
    console.log(udb.authorize({'userName':'KensukeS', 'userPassWord':'1'}));
})();
*/