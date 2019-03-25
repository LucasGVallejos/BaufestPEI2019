import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
var cors = require('cors');

const app = express();

export default class ExpressServer {
    
    constructor() {
        const root = path.normalize(__dirname + '/../..');

        app.use(cors());
        app.set('appPath', root + 'client');
        app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));        
    }

    public router(routes: (app: Application) => void): ExpressServer {
        if (process.env.SWAGGER_ENABLED === 'true' || false) {
            l.info(`swagger enabled !`);
            swaggerify(app, routes);
        }
        routes(app);
        return this;
    }

    public listen(p: string | number = process.env.PORT): Application {
        const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
        http.createServer(app).listen(p, welcome(p));
        return app;
    }
}
