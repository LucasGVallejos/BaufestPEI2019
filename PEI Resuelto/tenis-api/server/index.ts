import './common/env';
import Server from './common/server';
import routes from './routes';
import { createConnection } from "typeorm";
import l from './common/logger';

const port = parseInt(process.env.PORT);

//createDB connection
createConnection().then(connection => {
    l.info(`db connection success!`);
    const server : Server = new Server(); 
    server.router(routes);
    server.listen(port);
}).catch(err => l.error(err));
