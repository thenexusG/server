import { Router } from 'express';

import shoppingController from '../controllers/shoppingController';


class ShoppingRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', shoppingController.getClothes);
        this.router.post('/', shoppingController.createNewClothes);
        this.router.delete('/:id', shoppingController.deleteClothes);
        this.router.put('/existing/:id', shoppingController.removeQuantityExisting);
        this.router.get('/existing/:id', shoppingController.getClothesExisting);
        this.router.put('/:id', shoppingController.updateClothes);
    }
}


const shoppingRoutes = new ShoppingRoutes();
export default shoppingRoutes.router;