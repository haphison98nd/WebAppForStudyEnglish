(function main(){

    'use strict';
    
    const exec      = require('child_process').exec,
          date      = require('./myNodeModules/GetStrTimeOrYear.js'),
          targetURL = 'https://shunkan-eisakubun-web-app.herokuapp.com/'
    ;
    
    let request;

    request = function(){
        exec('curl ' + targetURL, function (error, stdout, stderr) {
            if(stdout){
                console.log('herokuNoSleep: Success ( ' + date.getDate() + ' ' + date.getTime() + ' ). Target URL is ' + targetURL);
            }
            if(error){
                console.log('herokuNoSleep: Failure. Target URL is ' + targetURL);
            }
	    });
    };
    
    request();
    console.log('herokuNoSleep: Start ( ' + date.getDate() + ' ' + date.getTime() + ' ). Target URL is ' + targetURL);
    setInterval(request, (1000 * 60 * 20));
    
})();
