var SimpleServerTemplate = function(){
    
    const getExtension = function (fileName) { 
        var fileNameLength = fileName.length,
            dotPoint       = fileName.indexOf('.', fileNameLength - 5 ),
            extension      = fileName.substring(dotPoint + 1, fileNameLength); 
        return extension; 
    };
    
    const getContentType = function (fileName) { 
        
        const contentType = { 
                'html' : 'text/html', 
                'htm'  : 'text/htm', 
                'css'  : 'text/css', 
                'js'   : 'text/javaScript; charset=utf-8', 
                'json' : 'application/json; charset=utf-8', 
                'xml'  : 'application/xml; charset=utf-8', 
                'jpeg' : 'image/jpeg', 
                'jpg'  : 'image/jpg', 
                'gif'  : 'image/gif', 
                'png'  : 'image/png', 
                'mp3'  : 'audio/mp3', 
             }, 
            extentsion        = getExtension(fileName).toLowerCase(),
            contentType_value = contentType[extentsion]
        ; 
            
        if(contentType_value === undefined){     
            contentType_value = 'text/plain';
        };
        
        return contentType_value; 
    };
    
    const startServer = function(LISTEN_IP, LISTEN_PORT){
        
        const http = require('http'),
              server  = http.createServer(),
              fs   = require('fs')
        ; 
        
        if (LISTEN_IP   === undefined) LISTEN_IP   = '127.0.0.1';
        if (LISTEN_PORT === undefined) LISTEN_PORT = 3000;

        server.on('request', function(request, response){ 

            const requestedFile = request.url; 
    
            console.log('Requested Url:' + request.url);                 
            requestedFile = (requestedFile.substring(requestedFile.length - 1, 1) === '/') ? requestedFile + DEFAULT_FILE : requestedFile; 

            console.log('Handle Url:' + requestedFile); 
            console.log('File Extention:' + getExtension(requestedFile)); 
            console.log('Content-Type:' + getContentType(requestedFile)); 
            
            fs.readFile('.' + requestedFile,'binary', function (err, data) { 
                    if(err){ 
                        response.writeHead(404, {'Content-Type': 'text/plain'}); 
                        response.write('not found\n'); 
                        response.end();
                    }else{ 
                        response.writeHead(200, {'Content-Type': getContentType(requestedFile)}); 
                        response.write(data, 'binary'); 
                        response.end(); 
                    } 
            });
        });

        server.listen(LISTEN_PORT, LISTEN_IP); 
        console.log('Server running at: ' + LISTEN_IP + ':' + LISTEN_PORT);

    };
    
    return {startServer:startServer};
};

(function main (){
    const simpleServerTemplate = SimpleServerTemplate();
    simpleServerTemplate.startServer('127.0.0.1', 3000);
})();
