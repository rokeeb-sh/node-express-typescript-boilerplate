import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import createError from "http-errors";
import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";

const app: Application = express(); // initializing express

/*
|---------------------------------------------------------------
| Application Middleware
|---------------------------------------------------------------
|
| These middleware are run during every request to your application.
*/

app.use(cors()); // cross scripting
app.use(logger('dev')); // using logger to log errors
app.use(bodyParser.json()); // body parser for body request
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

app.get('/', (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/html");
    res.send("Application up and running");
});

/*
|---------------------------------------------------------------
| Catch 404 And Forward To Error Handler
|---------------------------------------------------------------
|
| Error reporting on different levels.
| By default development will show errors but testing and prod will hide them.
*/

app.use((req: Request, res: Response, next: NextFunction) => { 
    next(createError(404, 'Not found')); 
});

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

export default app;