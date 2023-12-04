import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import shoppingRoutes from './routes/shoppingRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use((err: any, req: any, res: any, next: any) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
          });
    }

    routes(): void{
        this.app.use(indexRoutes);
        this.app.use('/api/articles', shoppingRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();