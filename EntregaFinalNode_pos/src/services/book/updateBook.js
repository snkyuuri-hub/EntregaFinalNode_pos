import Book from "../../model/book/Book.js";

const update = async (data, id) => {
  try {
    const [qtd] = await Book.update(data, {
      where: { id },
    });

    if (qtd === 0) {
      return false;
    }

    const book = await Book.findByPk(id);

    return book;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default update;