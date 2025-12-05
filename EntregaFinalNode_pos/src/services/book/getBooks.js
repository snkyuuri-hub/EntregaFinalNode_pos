import Book from "../../model/book/Book.js";
import Publisher from "../../model/publishers/Publisher.js";

const getAll = async () => {
  try {
    const books = await Book.findAll({
      include: {
        model: Publisher,
        as: "publisher", 
      },
    });

    return books;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getAll;