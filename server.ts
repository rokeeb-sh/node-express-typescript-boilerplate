/*
|---------------------------------------------------------------
| Normalize Port
|---------------------------------------------------------------
|
| This function returns a valid port, whether it is provided as 
| a number or a string.
*/

const normalizePort = (val: string): string | number | false => {
    const port: number = parseInt(val, 10);
    if (isNaN(port)) return val; // named pipe
    if (port >= 0) return port; // port number
    return false; // return false if the code above break through
}

/*
|---------------------------------------------------------------
| Event: On Listening
|---------------------------------------------------------------
|
| This function register, logging the port or named pipe on 
| which the server is running to the console.
*/

const onListening = (): void => {
    let address: any | null = server.address();
    let pipeAddr: string = "pipe " + address;
    let pipePort: string = "port " + address.port;
    debug("Listening on " + typeof address === "string" ? pipeAddr : pipePort);
}

/*
|---------------------------------------------------------------
| Event: On Error
|---------------------------------------------------------------
|
| This function checks for various errors and handles them 
| appropriately — it is then registered to the server.
*/
const onError = function (error: any) {
    if (error.syscall !== "listen") throw error;

    let pipePort: string = "Pipe " + port;
    let portPort: string = "Port " + port;
    let bind = typeof port === "string" ? pipePort : portPort;
    
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES": 
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE": 
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
}

/*
|---------------------------------------------------------------
| Start The Server
|---------------------------------------------------------------
|
*/

import http from "http";
import app from "./app";
import debug from "debug";

debug('backend-assessment-test:server'); // for development

const host: string = process.env.HOSTNAME || "http://127.0.0.1";
const port: string | number = process.env.PORT || '3000'; 
const server: http.Server = http.createServer(app); 

app.set('port', (normalizePort(port)));

// Listening on the configured port with host
server.listen(port, async () => console.log(`⚡️[server]: started server on ${host}:${port}`));

server.on('error', onError);
server.on('listening', onListening);