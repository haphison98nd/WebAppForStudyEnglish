
const Wafse_server = function () {
    
    'use strict';

    const app = require('express')(),
          httpServer = require('http').createServer(app)
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function initHttpServer () {
        
        const bodyParser = require('body-parser'),
              // superagent = require('superagent'),
              extendedFs = require('./myNodeModules/ExtendedFs.js'),
              userDb     = require('./myNodeModules/UserDataBaseProcessor.js'),
              PORT       = process.env.PORT || 3000,
              rootDir    = './public',
              textList = JSON.parse(extendedFs.readFileSync(rootDir + '/textDB/TextList.json', 'utf-8')),
              textDbController = require('./myNodeModules/TextDbController.js')([
                  ['どんどん話すための瞬間英作文トレーニング', rootDir + '/textDB/SyunkanEisakubun/SyunkanEisakubunDb.json'],
                  ['NHKゴガクル中学生レベル', rootDir + '/textDB/Gogakuru/JuniorHighSchoolLebelDb.json'],
                  ['NHKゴガクル高校生レベル', rootDir + '/textDB/Gogakuru/HighSchoolLebelDb.json'],
                  ['NHKゴガクル初心者レベル', rootDir + '/textDB/Gogakuru/BeginnerLevelDb.json'],
                  ['NHKゴガクル日常会話レベル', rootDir + '/textDB/Gogakuru/DailyLebelDb.json'],
                  ['NHKゴガクル文法特集', rootDir + '/textDB/Gogakuru/GrammarFeatureDb.json'],
                  ['NHKゴガクルボキャブラリー特集', rootDir + '/textDB/Gogakuru/VocabularyFeatureDb.json'],
                  ['NHKゴガクルビジネスレベル', rootDir + '/textDB/Gogakuru/BusinessLevelDb.json'],
                  ['NHKゴガクル実践レベル', rootDir + '/textDB/Gogakuru/PracticalLevelDb.json']
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

        app.get('/images/:path/:imageFileName', function(req, res){
            extendedFs.readFile(rootDir + '/images/' + req.params.path + '/' + req.params.imageFileName, function (err, file){
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
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        initHttpServer();
    })();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

(function main(){
    'use strict';
    const wafse_server = Wafse_server();
})();