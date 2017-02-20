var pseServer = function(){
    
    'use strict';

    var initHttpServer;   

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    initHttpServer = function(){
                
        const app         = require('express')(),
              bodyParser  = require('body-parser'),
              redis       = require('redis'),
              // heroku で redis を利用する場合は環境変数を利用.
              // 参考: https://devcenter.heroku.com/articles/heroku-redis#connecting-in-node-js
              redisClient = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) : redis.createClient(),
              extendFs    = require('./myNodeModules/ExtendedFs.js'),
              httpServer  = require('http').createServer(app),
              PORT        = process.env.PORT || 3000, 
              rootDir     = 'public',
              enquateDataHash = 'EnqueteData'
        ;
        
        let dataForHttpRes  = null;
         
        app.use(bodyParser.urlencoded({extended: true}));
        
        app.get('/', function(req, res){
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            dataForHttpRes = extendFs.readFileSync(rootDir + '/pseClient.html', 'utf-8');
            res.end(dataForHttpRes);
        });

        app.get('/css/:cssFileName', function(req, res){
            res.writeHead(200, {'Content-Type':'text/css; charset=utf-8'});
            dataForHttpRes = extendFs.readFileSync(rootDir + '/css/' +  req.params.cssFileName, 'utf-8');
            res.end(dataForHttpRes);
        });
        
        // クライアントに， redis に格納された EnquateData を取得させるメソッド．
        // note: エイリアス末尾の ? を消すと req.params.fileName がオプショナルでなくなり，
        //       fileName なしで http GET すると 404 になってしまう．
        app.get('/EnqueteData_948503482089214890/:fileName?', function(req, res){

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                        
            // ファイル名の指定が内場合はファイル名リストを表示．
            // そうでない場合は指定されたファイルをクライアントに送信．
            if(!req.params.fileName){   

                redisClient.hkeys(enquateDataHash, function (err, enquateDataNames) {
                    if (enquateDataNames.length === 0){
                        res.end("There's no EnqueteData.");
                    } else {
                        var joinedEnquateDataNames = enquateDataHash + ' name list: \n\n・ ' + enquateDataNames.join('\n・ ');
                        res.end(joinedEnquateDataNames);
                    }
                });
                
                /*
                // redis を利用しない場合の，クライアントからの EnquateData 名リスト要求処理．
                extendFs.getFileNameListAsync('./EnqueteData', 'json', function(enquateDataNames, err){
                    var joinedEnquateDataNames = enquateDataHash + ' name list: \n\n・ ' + enquateDataNames.join('\n・ ');
                    res.end(joinedEnquateDataNames);
                });
                */
                
            } else {
                
                redisClient.hget(enquateDataHash, req.params.fileName, function(err, enqueteData){
                    
                    if (err || enqueteData === null ) {
                        res.end('ファイル読み込み中にエラーが発生しました．ファイル名は正しいですか?');
                    } else {
                        res.end(enqueteData);
                    }
                    
                });  
                
                /*
                // redis を利用しない場合の，クライアントからの EnquateData 要求処理．
                try{
                    var enqueteData = extendFs.readFileSync('./EnqueteData/' + req.params.fileName, 'utf-8');
                    res.end(enqueteData);
                }catch(e){  
                    console.log(e);
                    res.end('ファイル読み込み中にエラーが発生しました．ファイル名は正しいですか?');
                }
                */
            }
        });
        
        app.get('/js/:jsFileName/:libraryJsFileName?', function(req, res){
            
            if(req.params.jsFileName === 'libraries'){
                res.writeHead(200, {'Content-Type':'text/javascript; charset=utf-8'});
                dataForHttpRes = extendFs.readFileSync(rootDir + '/js/libraries/' + req.params.libraryJsFileName, 'utf-8');
                res.end(dataForHttpRes);                
            }else{            
                res.writeHead(200, {'Content-Type':'text/javascript; charset=utf-8'});
                dataForHttpRes = extendFs.readFileSync(rootDir + '/js/' + req.params.jsFileName, 'utf-8');
                res.end(dataForHttpRes);
            }
            
        });
                
        // ExpressでPOSTを処理するメモ: http://qiita.com/K_ichi/items/c70bf4b08467717460d5
        app.post('/saveEnqueteData', function(req, res){
            
            let practiceMethodData = req.body;

            // 参考: http://qiita.com/toshirot/items/63de388bf40cff40a096
            try {
                redisClient.hset(enquateDataHash, String() + practiceMethodData.meta.userName, JSON.stringify(practiceMethodData));
                res.send('アンケートの回答，ありがとうございました．');
            } catch (e) {
                res.send('アンケート保存時にエラーが発生しました．');
                console.log(e);
            }
            
            /*
            // redis を利用しない場合の EnquateData 保存処理．
            extendFs.writeFile('./EnqueteData/EnqueteData_' + practiceMethodData.meta.userName + '.json', JSON.stringify(practiceMethodData), function(err){
               if(err){
                   res.send('アンケート保存時にエラーが発生しました．');
               }else{
                   res.send('アンケートの回答，ありがとうございました．');
               }
            });
            */
                        
        });

        httpServer.listen(PORT);
        console.log('Server running at... PORT: ' + PORT);
    };    
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor(){
        initHttpServer();
    })();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    var pses = pseServer();
})();