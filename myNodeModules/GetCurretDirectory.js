// extendedFs.realpathSync('./') (絶対パスを取得できる) を受け取り，current directory を返却するモジュール．
module.exports = function(absolutePath){
    
    var colors = require('colors'); 
    
    try{
        var currentDirectory = absolutePath.split('/');
        return currentDirectory[currentDirectory.length - 1];
    }catch(e){
        console.log('GetCurretDirectory.js: Error occured in GetCurretDirectory.js:'.red);
        console.log('GetCurretDirectory.js: GetCurretDirectory.js の引数には process.argv[1] を与えてください．:'.red);
        console.log(e);
    };
};