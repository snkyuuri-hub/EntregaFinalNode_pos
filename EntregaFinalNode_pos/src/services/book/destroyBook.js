import Book from "../../model/book/Book.js";

const destroy = async (id) => {
  try {
    const book = await Book.destroy({
      where: { id },
    });

    if (!book) {
      return false;
    }

    return book;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default destroy;