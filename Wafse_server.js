
const Wafse_server = function(){
    
    'use strict';

    const app = require('express')(),
          bodyParser = require('body-parser'),
          httpServer = require('http').createServer(app)
    ;
    
    let initHttpServer, initSocket;   

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    initHttpServer = function(){
        
        const extendedFs = require('./myNodeModules/ExtendedFs.js'),
              userDb     = require('./myNodeModules/UserDataBaseProcessor.js'),
              PORT       = process.env.PORT || 3000,
              rootDir    = 'public',
              textList = extendedFs.readFileSync('./TextDB/TextList.json', 'utf-8'),
              syunkanEisakubunDb = require('./myNodeModules/SimpleEnglishSentencesJsonDbController.js')('./TextDB/SyunkanEisakubun/Db.json')
        ;
        
        let dataForHttpRes = null;
                
        app.use(bodyParser.urlencoded({extended: true}));
        
        app.get('/', function(req, res){
            res.writeHead(200, {'Content-Type':'text/html'});
            dataForHttpRes = extendedFs.readFileSync(rootDir + '/Wafse.html', 'utf-8');
            res.end(dataForHttpRes);
        });
        
        app.get('/css/:cssFileName', function(req, res){
            res.writeHead(200, {'Content-Type':'text/css'});
            dataForHttpRes = extendedFs.readFileSync(rootDir + '/css/' +  req.params.cssFileName, 'utf-8');
            res.end(dataForHttpRes);
        });

        app.get('/images/:imageFileName', function(req, res){
            res.writeHead(200, {'Content-Type':'image/jpeg'});
            dataForHttpRes = extendedFs.readFileSync(rootDir + '/images/' +  req.params.imageFileName);
            res.end(dataForHttpRes, 'binary');
        });

        app.get('/js/:jsFileName/:libraryJsFileName?', function(req, res){
                        
            if(req.params.jsFileName === 'libraries'){
                res.writeHead(200, {'Content-Type':'text/javascript'});
                dataForHttpRes = extendedFs.readFileSync(rootDir + '/js/libraries/' + req.params.libraryJsFileName, 'utf-8');
                res.end(dataForHttpRes);                
            }else{            
                res.writeHead(200, {'Content-Type':'text/javascript'});
                dataForHttpRes = extendedFs.readFileSync(rootDir + '/js/' + req.params.jsFileName, 'utf-8');
                res.end(dataForHttpRes);
            }
            
        });

        app.get('/textList', function(req, res){
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(textList);
        });
        
        /*
        app.get('/htmlTemplates/:htmlTemplateName', function(req, res){
            dataForHttpRes = extendedFs.readFileSync(rootDir + '/htmlTemplates/' + req.params.htmlTemplateName, 'utf-8');
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(dataForHttpRes);
        });
        */
        
        // ExpressでPOSTを処理するメモ: http://qiita.com/K_ichi/items/c70bf4b08467717460d5
        app.post('/authorize', function(req, res){
            let dataForAuthorization = req.body;
            const authorizationResult = userDb.authorize(dataForAuthorization);

            res.contentType('application/json');

            if (authorizationResult === 'authorized'){ 
                res.send({status : 'success', message: 'ようこそ，' + String(dataForAuthorization.userName) + ' さん!'});
            } else if(authorizationResult === 'userNotExist'){ 
                res.send({status : 'userNameError', message: '登録されていないユーザ名です'});
            } else if (authorizationResult === 'incorrectUserPassword'){ 
                res.send({status : 'passwordError', message: '不正なパスワードです'});
            }
        });
        
        app.post('/createAccount', function(req, res){
            let dataForCreateAccount = req.body;
            const createAccountResult = userDb.addUserData(dataForCreateAccount);

            res.contentType('application/json');

            if (createAccountResult){ 
                res.send({status : 'success', message: 'ようこそ，' + String(dataForCreateAccount.userName) + ' さん!'});
            } else { 
                res.send({status : 'error', message: '既に登録されているユーザです'});
            }
        });
        
        app.post('/textPartNameList', function(req, res){
            let dataForTextPartNameList = req.body;
            
            if (String(dataForTextPartNameList.titleText) === 'どんどん話すための瞬間英作文トレーニング'){
                res.send(syunkanEisakubunDb.getTextPartNameList());
            }
        });
        
        app.post('/textPageNameList', function(req, res){
            let dataForTextPageNameList = req.body;
            
            // console.log(syunkanEisakubunDb.getPageContents('原型不定詞・使役'));
            if (String(dataForTextPageNameList.titleText) === 'どんどん話すための瞬間英作文トレーニング'){
                res.send(syunkanEisakubunDb.getTextPageNameList(String(dataForTextPageNameList.textPartName)));
            }
        });
        
        httpServer.listen(PORT);
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    initSocket = function(){

        var socketIo = require ('socket.io'),
            io       = socketIo.listen(httpServer),
            chatDataList = [],
            userNameList = []
        ;
        
        // socket.io のデータ送信メソッドについて
        //      io.sockets.emit  　    → 自分を含む全員にデータを送信する.
        //      socket.broadcast.emit　→ 自分を以外の全員にデータを送信する.
        //      socket.emit　          → 自分のみにデータを送信する. socket.emit であることに注意!
        //      参考: http://www.tettori.net/post/852/ , http://blog.choilabo.com/20120320/31
        
        io.sockets.on('connection', function(socket){
            
            // console.log(socket.id); // クライアントに個別に振られる id. 
            
            socket.on('clientConnected', function(data){ // クライアントから clientConnected という socket を受け取った時に発火．
                socket.emit('chatDataList', chatDataList);
            });
            
            socket.on('chatData', function(chatData){
                socket.broadcast.emit('chatData', chatData);
                chatDataList.push(chatData);
            });  
            
            socket.on('inputUserName', function(inputUserName){
                
                // 既に存在しているユーザ名は許可しない．
                if(userNameList.indexOf(inputUserName) != -1){
                    socket.emit('userNameRes', {
                        status : 'error',
                        message: '入力されたユーザ名は\n既に利用されています!'
                    });
                }else{ // ユーザ名が重複していない場合は認証成功とする．
                    
                    userNameList.push(inputUserName);

                    socket.emit('userNameRes', {
                        status : 'success',
                        message: 'ログインが完了しました!'
                    });

                    io.sockets.emit('userNameList', userNameList);
                }
                
            });  
            
            socket.on('disConected', function(userName){
                socket.broadcast.emit('removeUser', userName);
                console.log('rgavs');
            }); 
            
        });

    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor(){
        initHttpServer();
        // initSocket();
    })();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    const wafse_server = Wafse_server();
})();