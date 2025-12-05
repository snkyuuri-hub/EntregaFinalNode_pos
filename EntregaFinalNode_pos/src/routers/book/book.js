import express from "express";
import bookController from "../../controllers/book/bookController.js";
import auth from "../../middleware/auth.js";

const routerBook = express.Router();

routerBook.post("/book", auth, bookController.createBook);

routerBook.get("/book/:id", auth, bookController.getBook);

routerBook.get("/books", auth, bookController.getBooks);

routerBook.delete("/book/:id", auth, bookController.destroyBook);

routerBook.patch("/book/:id", auth, bookController.updateBook);

export default routerBook;