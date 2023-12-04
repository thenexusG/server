"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingController_1 = __importDefault(require("../controllers/shoppingController"));
class ShoppingRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', shoppingController_1.default.getClothes);
        this.router.post('/', shoppingController_1.default.createNewClothes);
        this.router.delete('/:id', shoppingController_1.default.deleteClothes);
        this.router.put('/existing/:id', shoppingController_1.default.removeQuantityExisting);
        this.router.get('/existing/:id', shoppingController_1.default.getClothesExisting);
        this.router.put('/:id', shoppingController_1.default.updateClothes);
    }
}
const shoppingRoutes = new ShoppingRoutes();
exports.default = shoppingRoutes.router;
