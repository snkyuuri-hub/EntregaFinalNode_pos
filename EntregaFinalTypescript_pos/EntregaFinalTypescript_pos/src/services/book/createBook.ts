import BookModelInterface from "../../model/book/interface/BookModelInterface";
import BookValidPayloadInterface from "../../model/book/interface/BookValidPayloadInterface";
import bookRepository from "../../model/book/bookRepository";

// Validação do payload (igual ao professor fazia com id/sku/quantity)
const validPayload = (body: BookValidPayloadInterface): boolean => {
  if (!body.title || !body.author) {
    return false;
  }
  return true;
};

// Criação do livro
const create = async (
  book: Partial<BookModelInterface>
): Promise<BookModelInterface | boolean> => {
  try {
    const newBook = await bookRepository.create({
      title: book.title!,
      author: book.author!,
      year: book.year,
      isbn: book.isbn,
      publisherId: book.publisherId,
      reference: book.reference,
      status: book.status,
    });

    if (!newBook) {
      return false;
    }

    return newBook;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

export default {
  create,
  validPayload,
};