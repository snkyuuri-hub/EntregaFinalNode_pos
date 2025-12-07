import bookRepository from "../../model/book/bookRepository";
import BookModelInterface from "../../model/book/interface/BookModelInterface";

const getBooks = async (): Promise<BookModelInterface[]> => {
  try {
    const books = await bookRepository.findAll();
    return books;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getBooks;
