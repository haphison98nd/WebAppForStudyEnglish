// redis を node.js で扱うテストコード．
// note: 本プログラム実行前に redis サーバを redis-server コマンドで起動すること．
// node-redis doc: https://github.com/NodeRedis/node_redis
// 参考: http://qiita.com/yoh-nak/items/e3b3db125e41b07219d1
// 参考: http://stackoverflow.com/questions/8754304/redis-connection-to-127-0-0-16379-failed-connect-econnrefused

(function () {
    
    'use strict';
    
    const redis = require('redis'),
          redisClient = redis.createClient(process.env.REDIS_URL) || redis.createClient(),
          obj1 = {
              status : 10,
              message: 'sss'
          },
          obj2 = {
              status : 20,
              message: 'ssss!'
          }
    ;
    
    /*
    
    redisClient.set('obj1', JSON.stringify(obj1), function(){});
    redisClient.set('obj2', JSON.stringify(obj2), function(){});
    
    redisClient.get('obj1',function(err,data){
        console.log(data);
    });
    
    */
    
    /*
    redisClient.keys('*', function(err, keys){
      if (err) return console.log(err);
      for (var i = 0, len = keys.length; i < len; i++) {
        console.log(keys[i]);
      }
    });
    */
    
    // /*
    // キーおよびデータの削除. 参考: http://stackoverflow.com/questions/32842712/delete-array-of-keys-in-redis-using-node-redis
    redisClient.del('EnqueteData', function(err, o){
        if (err) console.log('error occured on: redisClient.del');
        // process.exit();
    });
    // */
    
    // testObjName オブジェクト内に key -> hashtest 1 , vakue -> 'some value' を格納．
    redisClient.hset('testObjName', 'testKey01', 'some value');
    redisClient.hset('testObjName', 'testKey02', 'some other value');

    // オブジェクト testObjName のすべての key を取得.
    redisClient.hkeys('testObjName', function (err, keys) {

        console.log(keys);
        
        // 指定した key の value のみを オブジェクト testObjName から抽出．
        redisClient.hget('testObjName', keys[0], function(err, value){
            console.log(value);
            redisClient.quit();
        });        
    
    });
    
    // オブジェクト testObjName をそのままオブジェクトとして抽出．
    redisClient.hgetall('testObjName', function (err, obj) {
        console.log(obj);
    });
    
})();


