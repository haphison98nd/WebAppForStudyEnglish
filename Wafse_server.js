
var Wafse_server = function(){
    
    'use strict';

    const app = require('express')(),
          httpServer = require('http').createServer(app)
    ;
    
    let initHttpServer, initSocket;   

    //////////////////////////////////////////////
    //////////////////////////////////////////////


    initHttpServer = function(){
        
        var fs         = require('fs'),
            PORT       = process.env.PORT || 3000,
            rootDir    = 'public',
            data       = null
        ;
        
        app.get('/', function(req, res){
            res.writeHead(200, {'Content-Type':'text/html'});
            data = fs.readFileSync(rootDir + '/login.html', 'utf-8');
            res.end(data);
        });

        app.get('/css/:cssFileName', function(req, res){
            res.writeHead(200, {'Content-Type':'text/css'});
            data = fs.readFileSync(rootDir + '/css/' +  req.params.cssFileName, 'utf-8');
            res.end(data);
        });

        app.get('/images/:imageFileName', function(req, res){
            console.log('test');
            res.writeHead(200, {'Content-Type':'image/jpeg'});
            data = fs.readFileSync(rootDir + '/images/' +  req.params.imageFileName);
            res.end(data, 'binary');
        });

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