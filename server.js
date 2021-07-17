const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;
app.set('port', port)
app.set('secPort', port+433);

process.on('uncaughtException', err => {
    logError(err);
    if(!isOperationalError(err)){
        process.exit(1);
    }
})

process.on('unhandledRejection', err => {
    throw err;
})

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`http://localhost:${port}/`);
})

// setup https
// start..
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync(__dirname+'/private.key'),
    cert: fs.readFileSync(__dirname+'/certificate.pem')
};
const secureServer = https.createServer(options, app);
secureServer.listen(app.get('secPort'), () => {
    console.log('Secure Server listining ...');
});

secureServer.on('error', console.error);
secureServer.on('listening', console.log);
//end setup