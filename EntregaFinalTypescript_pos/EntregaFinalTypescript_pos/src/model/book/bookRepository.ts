import Book from "./book"; 
import BookModelInterface from "./interface/BookModelInterface";

const create = async (
  book: Partial<BookModelInterface>
): Promise<BookModelInterface> => {
  try {
    const newBook = await Book.create(book);
    return newBook;
  } catch (error: any) {
    throw new Error(error);
  }
};

const destroy = async (id: number): Promise<boolean> => {
  try {
    const deleted = await Book.destroy({ where: { id } });
    return deleted > 0;
  } catch (error: any) {
    throw new Error(error);
  }
};

const update = async (
  book: Partial<BookModelInterface>,
  id: number
): Promise<boolean> => {
  try {
    const [affectedRows] = await Book.update(book, { where: { id } });
    return affectedRows > 0;
  } catch (error: any) {
    throw new Error(error);
  }
};

const findAll = async (where: object = {}): Promise<BookModelInterface[]> => {
  try {
    const books = await Book.findAll({ where: { ...where } });
    return books;
  } catch (error: any) {
    throw new Error(error);
  }
};

const findByReference = async (
  reference: string
): Promise<BookModelInterface | null> => {
  try {
    const book = await Book.findOne({ where: { reference } });
    return book;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default { create, destroy, update, findAll, findByReference };