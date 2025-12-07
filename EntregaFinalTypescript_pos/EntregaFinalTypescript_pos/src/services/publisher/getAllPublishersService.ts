import publisherRepository from "../../model/publishers/publisherRepository";
import PublisherModelInterface from "../../model/publishers/Interface/PublisherModelInterface";

const getPublishers = async (): Promise<PublisherModelInterface[]> => {
  try {
    const publishers = await publisherRepository.findAll();
    return publishers;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default {
  getPublishers,
};