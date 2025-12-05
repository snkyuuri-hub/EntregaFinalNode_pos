import Model from "../../model/index.js";

const createBook = async (book) => {
  try {
    const create = await Model.Book.create({
      title: book.title,
      author: book.author,
      year: book.year,
      isbn: book.isbn,
      publisherId: book.publisherId, 
    });

    if (!create) {
      return false;
    }

    return create;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default createBook;
