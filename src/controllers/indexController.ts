import {Request, Response} from 'express';

class IndexController{

    public index (req: Request, res: Response){ 
        res.json({text: 'aaaa'})
    }
}

export const indexController = new IndexController();