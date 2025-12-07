import bookRepository from "../../model/book/bookRepository";

const updateBook = async (
  id: number,
  data: Partial<{
    title: string;
    author: string;
    year: number;
    isbn: string;
    status: string;
    publisherId: number;
  }>
): Promise<boolean> => {
  try {
    const updated = await bookRepository.update(data, id);
    return updated;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default updateBook;