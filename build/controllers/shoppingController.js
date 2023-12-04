"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ShoppingController {
    getClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM mercancia;';
                const articles = yield database_1.default.any(query);
                res.json(articles);
            }
            catch (error) {
                console.error('Error al obtener la lista de prendas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    createNewClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, talla, cantidad_existente, precio, imagen_base64 } = req.body;
            try {
                const query = `
            INSERT INTO mercancia (nombre, talla, cantidad_existente, precio, imagen_base64)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`;
                const values = [nombre, talla, cantidad_existente, precio, imagen_base64];
                const result = yield database_1.default.one(query, values);
                res.json({ message: 'Artículo guardado', data: result });
            }
            catch (error) {
                console.error('Error al guardar el artículo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    updateClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, categoria, cantidad_existente, precio, imagen_base64 } = req.body;
            try {
                const query = `
            UPDATE mercancia
            SET nombre = $1, categoria = $2, cantidad_existente = $3, precio = $4, imagen_base64 = $5
            WHERE id = $6
            RETURNING *;`;
                const values = [nombre, categoria, cantidad_existente, precio, imagen_base64, id];
                const result = yield database_1.default.one(query, values);
                res.json({ message: 'La prenda ha sido actualizada con éxito', data: result });
            }
            catch (error) {
                console.error('Error al actualizar la prenda:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    deleteClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const query = 'DELETE FROM mercancia WHERE id = $1 RETURNING *;';
                const result = yield database_1.default.oneOrNone(query, id);
                if (result) {
                    res.json({ message: 'La prenda ha sido eliminada correctamente', data: result });
                }
                else {
                    res.status(404).json({ error: 'La prenda no fue encontrada' });
                }
            }
            catch (error) {
                console.error('Error al eliminar la prenda:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    removeQuantityExisting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const query = `
            UPDATE mercancia
            SET cantidad_existente = cantidad_existente - 1
            WHERE id = $1
            RETURNING *;`;
                const result = yield database_1.default.one(query, id);
                if (result) {
                    res.json({ message: 'La prenda ha sido actualizada exitosamente - 1', data: result });
                }
                else {
                    res.status(404).json({ error: 'La prenda no fue encontrada' });
                }
            }
            catch (error) {
                console.error('Error al actualizar la prenda:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    getClothesExisting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const query = 'SELECT cantidad_existente FROM mercancia WHERE id = $1;';
                const result = yield database_1.default.oneOrNone(query, id);
                if (result) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ error: 'La prenda no fue encontrada' });
                }
            }
            catch (error) {
                console.error('Error al obtener la cantidad existente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const shoppingController = new ShoppingController();
exports.default = shoppingController;
