import publisherRepository from "../../model/publishers/publisherRepository";
import PublisherModelInterface from "../../model/publishers/Interface/PublisherModelInterface";

const update = async (
  publisher: Partial<PublisherModelInterface>,
  id: number
): Promise<boolean> => {
  try {
    const publisherUpdate = await publisherRepository.update(publisher, id);
    return publisherUpdate;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default {
  update,
};