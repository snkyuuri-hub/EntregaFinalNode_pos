import bookRepository from "../../model/book/bookRepository";
import BookModelInterface from "../../model/book/interface/BookModelInterface";

// busca um livro específico pela referência
const getBook = async (reference: string): Promise<BookModelInterface | null> => {
  try {
    const book = await bookRepository.findByReference(reference);
    return book;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getBook;