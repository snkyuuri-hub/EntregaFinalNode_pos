import { Router } from "express";
import bookController from "../../controllers/book/bookController";

const router = Router();

// Criar livro
router.post("/books", bookController.create);

// Webhook de notificação do Mercado Pago
router.post("/books/notify", bookController.notify);

// Listar todos os livros
router.get("/books", bookController.list);

// Buscar livro por referência
router.get("/books/:reference", bookController.get);

// Atualizar livro
router.put("/books/:id", bookController.update);

// Remover livro
router.delete("/books/:id", bookController.destroy);

export default router;