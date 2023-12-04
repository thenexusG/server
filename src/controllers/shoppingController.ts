import {Request, Response} from 'express';

import pool from '../database';

class ShoppingController{

    public async getClothes(req: Request, res: Response){ 
        try {
            const query = 'SELECT * FROM mercancia;';
            const articles = await pool.any(query);
        
            res.json(articles);
          } catch (error) {
            console.error('Error al obtener la lista de prendas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
          }
     }

    public async createNewClothes(req: Request, res: Response): Promise<void>{
        const { nombre, talla, cantidad_existente, precio, imagen_base64 } = req.body;

        try {
          const query = `
            INSERT INTO mercancia (nombre, talla, cantidad_existente, precio, imagen_base64)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`;
      
          const values = [nombre, talla, cantidad_existente, precio, imagen_base64];
      
          const result = await pool.one(query, values);
      
          res.json({ message: 'Artículo guardado', data: result });
        } catch (error) {
          console.error('Error al guardar el artículo:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
 
    public async updateClothes(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const { nombre, categoria, cantidad_existente, precio, imagen_base64 } = req.body;
      
        try {
          const query = `
            UPDATE mercancia
            SET nombre = $1, categoria = $2, cantidad_existente = $3, precio = $4, imagen_base64 = $5
            WHERE id = $6
            RETURNING *;`;
      
          const values = [nombre, categoria, cantidad_existente, precio, imagen_base64, id];
      
          const result = await pool.one(query, values);
      
          res.json({ message: 'La prenda ha sido actualizada con éxito', data: result });
        } catch (error) {
          console.error('Error al actualizar la prenda:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
   
    public async deleteClothes(req: Request, res: Response): Promise<any>{
        const { id } = req.params;

            try {
                const query = 'DELETE FROM mercancia WHERE id = $1 RETURNING *;';
                const result = await pool.oneOrNone(query, id);

                if (result) {
                res.json({ message: 'La prenda ha sido eliminada correctamente', data: result });
                } else {
                res.status(404).json({ error: 'La prenda no fue encontrada' });
                }
            } catch (error) {
                console.error('Error al eliminar la prenda:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
    }

    public async removeQuantityExisting(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const query = `
            UPDATE mercancia
            SET cantidad_existente = cantidad_existente - 1
            WHERE id = $1
            RETURNING *;`;

            const result = await pool.one(query, id);

            if (result) {
            res.json({ message: 'La prenda ha sido actualizada exitosamente - 1', data: result });
            } else {
            res.status(404).json({ error: 'La prenda no fue encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la prenda:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
      }

    public async getClothesExisting(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
          const query = 'SELECT cantidad_existente FROM mercancia WHERE id = $1;';
          const result = await pool.oneOrNone(query, id);
      
          if (result) {
            res.json(result);
          } else {
            res.status(404).json({ error: 'La prenda no fue encontrada' });
          }
        } catch (error) {
          console.error('Error al obtener la cantidad existente:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}


const shoppingController = new ShoppingController();
export default shoppingController;