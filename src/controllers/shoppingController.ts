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

    public async removeQuantityExisting(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        await pool.query('UPDATE mercancia SET cantidad_existente = cantidad_existente - 1 WHERE id = ?', [id]);
        res.json({ message: 'Clothing has been successfully updated - 1' });
      }

    public async getClothesExisting(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        const articles = await pool.query('SELECT cantidad_existente FROM mercancia WHERE id = ?', [id]);
        res.json(articles);
    }
}


const shoppingController = new ShoppingController();
export default shoppingController;