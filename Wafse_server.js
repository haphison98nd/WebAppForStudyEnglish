
const Wafse_server = function(){
    
    'use strict';

    const app = require('express')(),
          httpServer = require('http').createServer(app)
    ;
    
    let initHttpServer, initSocket;   

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    initHttpServer = function(){
        
        const bodyParser = require('body-parser'),
              // superagent = require('superagent'),
              extendedFs = require('./myNodeModules/ExtendedFs.js'),
              userDb     = require('./myNodeModules/UserDataBaseProcessor.js'),
              PORT       = process.env.PORT || 3000,
              rootDir    = 'public',
              textList = JSON.parse(extendedFs.readFileSync('./TextDB/TextList.json', 'utf-8')),
              textDbController = require('./myNodeModules/TextDbController.js')([
                  ['どんどん話すための瞬間英作文トレーニング', './TextDB/SyunkanEisakubun/SyunkanEisakubunDb.json'],
                  ['NHKゴガクル中学生レベル', './TextDB/Gogakuru/JuniorHighSchoolLebelDb.json'],
                  ['NHKゴガクル高校生レベル', './TextDB/Gogakuru/HighSchoolLebelDb.json'],
                  ['NHKゴガクル初心者レベル', './TextDB/Gogakuru/BeginnerLevelDb.json'],
                  ['NHKゴガクル日常会話レベル', './TextDB/Gogakuru/DailyLebelDb.json'],
                  ['NHKゴガクル文法特集', './TextDB/Gogakuru/GrammarFeatureDb.json'],
                  ['NHKゴガクルボキャブラリー特集', './TextDB/Gogakuru/VocabularyFeatureDb.json'],
                  ['NHKゴガクルビジネスレベル', './TextDB/Gogakuru/BusinessLevelDb.json'],
                  ['NHKゴガクル実践レベル', './TextDB/Gogakuru/PracticalLevelDb.json']
              ])
        ;
                
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.use(bodyParser.urlencoded({extended: true}));
        
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/', function(req, res){
            extendedFs.readFile(rootDir + '/Wafse.html', 'utf-8', function (err, file){
                // how to write http header on Express: http://techhey.hatenablog.com/entry/2014/04/11/221129
                res.status(200).contentType('text/html').end(file);
            });
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/css/:cssFileName', function(req, res){
            extendedFs.readFile(rootDir + '/css/' +  req.params.cssFileName, 'utf-8', function (err, file){
                res.status(200).contentType('text/css').end(file);
            });            
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/js/:jsFileName/:libraryJsFileName?', function(req, res){   
            res.status(200).contentType('text/javascript');
            if(req.params.jsFileName === 'libraries'){
                extendedFs.readFile(rootDir + '/js/libraries/' + req.params.libraryJsFileName, 'utf-8', function (err, file){
                    res.end(file);
                });
            }else{            
                extendedFs.readFile(rootDir + '/js/' + req.params.jsFileName, 'utf-8', function (err, file){
                    res.end(file);
                });    
            }
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/images/:imageFileName', function(req, res){
            extendedFs.readFile(rootDir + '/images/' + req.params.imageFileName, function (err, file){
                res.status(200).contentType('image/jpeg').end(file, 'binary');
            });       
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/markDownFileNameList', function(req, res){            
            extendedFs.getFileNameListAsync(rootDir + '/markDowns', 'md', function(fileNameList, err){
                res.status(200).contentType('application/json').json(fileNameList);
            });
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/markDown', function(req, res){    
            const markDownFileName = req.query.markDownFileName;
            extendedFs.readFile(rootDir + '/markDowns/' + String(markDownFileName), 'utf-8',function (err, file){
                res.status(200).contentType('text/plain').end(file);
            });       
        });
        
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        /*
        app.get('/htmlTemplates/:htmlTemplateName', function(req, res){
            const html = extendedFs.readFileSync(rootDir + '/htmlTemplates/' + req.params.htmlTemplateName, 'utf-8');
            res.status(200).contentType('text/html').end(html);
        });
        */
        
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        // ExpressでPOSTを処理するメモ: http://qiita.com/K_ichi/items/c70bf4b08467717460d5
        app.post('/authorize', function(req, res){
            let dataForAuthorization = req.body; 
            const authorizationResult = userDb.authorize(dataForAuthorization);
            res.status(200).contentType('application/json');
            if (authorizationResult === 'authorized'){
                res.json({status : 'success', message: 'ようこそ，' + String(dataForAuthorization.userName) + ' さん!'});
            } else if(authorizationResult === 'userNotExist'){ 
                res.json({status : 'userNameError', message: '登録されていないユーザ名です'});
            } else if (authorizationResult === 'incorrectUserPassword'){ 
                res.json({status : 'passWordError', message: '不正なパスワードです'});
            }
        });
        
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.post('/createAccount', function(req, res){
            let dataForCreateAccount = req.body;
            const createAccountResult = userDb.addUserData(dataForCreateAccount);
            res.status(200).contentType('application/json');
            if (createAccountResult){ 
                res.json({status : 'success', message: 'ようこそ，' + String(dataForCreateAccount.userName) + ' さん!'});
            } else { 
                res.json({status : 'error', message: '既に登録されているユーザです'});
            }
        });
        
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/textList', function(req, res){
            res.status(200).contentType('application/json').json(textList);
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/textPartNameList', function(req, res){
            let query = req.query; // how to get request palam on Express: http://d.hatena.ne.jp/replication/20110307/1299451484
            res.status(200)
               .contentType('application/json')
               .json(textDbController.getTextPartNameList(query.titleText))
            ;
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////

        app.get('/textPageNameList', function(req, res){
            let query = req.query;
            res.status(200)
               .contentType('application/json')
               .json(textDbController.getTextPageNameList(query.titleText, query.textPartName))
            ;
        });

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        
        app.get('/pageContents', function(req, res){
            let query = req.query;
            res.status(200)
               .contentType('application/json')
               .json(textDbController.getPageContents(query.titleText, query.textPartName, query.textPageName))
            ;
        });
        
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        
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