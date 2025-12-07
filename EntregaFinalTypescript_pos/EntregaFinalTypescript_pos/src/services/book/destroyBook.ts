import bookRepository from "../../model/book/bookRepository";

const destroyBook = async (id: number): Promise<boolean> => {
  try {
    const deleted = await bookRepository.destroy(id);
    return deleted;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default destroyBook;