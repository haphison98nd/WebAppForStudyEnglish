// socket.io はクライアントと push 通信を実現するライブラリです．
// socket.io は npm でインストールできます．(コマンドラインで npm install socketio と入力し実行)．
// 参考: http://socket.io
// 参考: http://qiita.com/ij_spitz/items/2c66d501f29bff3830f7

var SocketChat_server = function(){
    
    'use strict';
    
    var initHttpServer, initSocket,
        app        = require('express')(),
        // require('http') は Node.js の標準 http モジュールを呼び出しています．
        // ここで http モジュールと express を関連付けています．
        httpServer = require('http').createServer(app)
    ;   

    initHttpServer = function(){
        
        var fs         = require('fs'),
            PORT       = process.env.PORT || 3000,
            rootDir    = 'public',
            data       = null
        ;
        
        app.get('/', function(req, res){
            res.writeHead(200, {'Content-Type':'text/html'});
            data = fs.readFileSync(rootDir + '/acim7.html', 'utf-8');
            res.end(data);
        });

        app.get('/css/:cssFileName', function(req, res){
            res.writeHead(200, {'Content-Type':'text/css'});
            data = fs.readFileSync(rootDir + '/css/' +  req.params.cssFileName, 'utf-8');
            res.end(data);
        });

        // js フォルダには libraries フォルダも存在するので，プレースホルダを利用し
        // ルーティングしています．
        app.get('/js/:jsFileName/:libraryJsFileName?', function(req, res){
                        
            if(req.params.jsFileName === 'libraries'){
                res.writeHead(200, {'Content-Type':'text/javascript'});
                data = fs.readFileSync(rootDir + '/js/libraries/' + req.params.libraryJsFileName, 'utf-8');
                res.end(data);                
            }else{            
                res.writeHead(200, {'Content-Type':'text/javascript'});
                data = fs.readFileSync(rootDir + '/js/' + req.params.jsFileName, 'utf-8');
                res.end(data);
            }
            
        });
        
        httpServer.listen(PORT);
    };

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
    
    (function constructor(){
        initHttpServer();
        initSocket();
    })();
};

(function main(){
    'use strict'
    var scs = SocketChat_server();
})();