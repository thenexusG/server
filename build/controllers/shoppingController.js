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
            const articles = yield database_1.default.query('SELECT * FROM mercancia');
            res.json(articles);
        });
    }
    createNewClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO mercancia SET ?', [req.body]);
            res.json({ message: 'articulo guardado' });
        });
    }
    updateClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE mercancia SET ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'Clothing has been successfully updated' });
        });
    }
    deleteClothes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM mercancia WHERE id = ?', [id]);
            res.json({ message: 'Clothes have been disposed of correctly' });
        });
    }
    removeQuantityExisting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('UPDATE mercancia SET cantidad_existente = cantidad_existente - 1 WHERE id = ?', [id]);
            res.json({ message: 'Clothing has been successfully updated - 1' });
        });
    }
    getClothesExisting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const articles = yield database_1.default.query('SELECT cantidad_existente FROM mercancia WHERE id = ?', [id]);
            res.json(articles);
        });
    }
}
const shoppingController = new ShoppingController();
exports.default = shoppingController;
