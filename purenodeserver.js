const http = require('http');
const url = require('url');
function handler(req,res){
    const parsedUrl = url.parse(req.url,true);
    /*console.log(parseUrl);*/
    if(parsedUrl.pathname === '/')
    {
    res.writeHead(200,{'Content-type':'text/plain'});
    res.write('Hello, I am Ktashi Server');
    res.end();
    }else if(parsedUrl.pathname === '/time'){
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write(new Date().toString());
        return res.end();
    }else if(parsedUrl.pathname.startsWith('/user/')){
        const regex = RegExp('\/user\/(.+)');
        const matches = regex.exec(parsedUrl.pathname);
        if(!matches || !matches[1]){
            res.writeHead(401,{'Content-type':'text/plain'});
            return res.end();    
        }
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write(`Welcome to  ${matches[1]}'s Profile`);
        return res.end();
    }
    else if(parsedUrl.pathname === '/hello'){
        const name = parsedUrl.query.name;
        if(!name){
            res.writeHead(401,{'Content-type':'text/plain'});
            return res.end();    
        }else{
            res.writeHead(200,{'Content-type':'text/plain'});
            res.write(`Hello ${name}`);
            return res.end();
        }
    }
    else{
        res.writeHead(401,{'Content-type':'text/plain'});
        return res.end();
    }
    
}
const server=http.createServer(handler);
server.listen(5000);