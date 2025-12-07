import PublisherValidPayloadInterface from "../../model/publishers/Interface/PublisherValidPayloadInterface";
import PublisherModelInterface from "../../model/publishers/Interface/PublisherModelInterface";
import publisherRepository from "../../model/publishers/publisherRepository";

const validPayload = (body: PublisherValidPayloadInterface): boolean => {
  if (!body.name || !body.country) {
    return false;
  }

  return true;
};

const create = async (
  publisher: Partial<PublisherModelInterface>
): Promise<PublisherModelInterface> => {
  try {
    const newPublisher = await publisherRepository.create(publisher);
    return newPublisher;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default {
  create,
  validPayload,
};