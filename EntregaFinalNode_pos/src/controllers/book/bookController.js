import getAll from "../../services/book/getBooks.js";
import getOne from "../../services/book/getBook.js";
import create from "../../services/book/createBook.js";
import destroy from "../../services/book/destroyBook.js";
import update from "../../services/book/updateBook.js";
import createPublisher from "../../services/publisher/createPublisher.js";

const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }
    const book = await getOne(id);
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.status(200).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const getBooks = async (req, res) => {
  const books = await getAll();
  res.status(200).json({ data: books });
};

const createBook = async (req, res) => {
  try {
    const { title, author, year, publisher } = req.body;
    if (!title || !author || !year) {
      return res.status(400).json({ message: "Título, autor e ano são obrigatórios" });
    }
    const newBook = await create(req.body);
    if (!newBook) {
      return res.status(400).json({ message: "Erro ao criar o livro" });
    }
    let publisherCreate;
    if (publisher) {
      publisherCreate = await createPublisher(publisher, newBook.id);
    }
    res.status(201).json({ data: newBook, publisherCreate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const destroyBook = async (req, res) => {
  const id = req.params.id;
  const book = await destroy(id);
  if (!book) {
    return res.status(400).json({ message: "Erro ao excluir o livro" });
  }
  res.status(200).json({ message: "Livro deletado com sucesso", book });
};

const updateBook = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const book = await update(data, id);
  if (!book) {
    return res.status(400).json({ message: "Erro ao atualizar o livro" });
  }
  res.status(200).json({ message: "Livro atualizado com sucesso", book });
};

export default {
  getBook,
  getBooks,
  createBook,
  destroyBook,
  updateBook,
};