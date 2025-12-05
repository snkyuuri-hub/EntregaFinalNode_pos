import Model from "../../model/index.js";

const getOne = async (id) => {
  try {
    const book = await Model.Book.findOne({
      where: { id },
    });

    if (!book) {
      return false;
    }

    return book;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getOne;
