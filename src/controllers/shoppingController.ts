import {Request, Response} from 'express';

import pool from '../database';

class ShoppingController{

    public async getClothes(req: Request, res: Response){ 
        const articles = await pool.query('SELECT * FROM mercancia');
         res.json(articles);
     }

    public async createNewClothes(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO mercancia SET ?', [req.body]);
        res.json({message: 'articulo guardado'});
    }
 
    public async updateClothes(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('UPDATE mercancia SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'Clothing has been successfully updated'})
    }
   
    public async deleteClothes(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('DELETE FROM mercancia WHERE id = ?', [id]);
        res.json({message: 'Clothes have been disposed of correctly'});
    }

}


const shoppingController = new ShoppingController();
export default shoppingController;