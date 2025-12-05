import Publisher from "../../model/publishers/Publisher.js";

const createByList = async (publishers, bookId) => {
  const response = {
    success: [],
    error: [],
  };

  for (const publisher of publishers) {
    const publisherCreate = await Publisher.create({
      name: publisher,
      bookId,
    });

    if (!publisherCreate) {
      response.error.push(publisher);
      continue;
    }

    response.success.push(publisher);
  }

  return response;
};

export default createByList;