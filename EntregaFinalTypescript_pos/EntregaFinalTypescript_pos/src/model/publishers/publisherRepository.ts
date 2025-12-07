import PublisherModelInterface from "./Interface/PublisherModelInterface";
import Publisher from "./publishers"; 

const create = async (
  publisher: Partial<PublisherModelInterface>
): Promise<PublisherModelInterface> => {
  try {
    const newPublisher = await Publisher.create(publisher);
    return newPublisher;
  } catch (error: any) {
    throw new Error(error);
  }
};

const findAll = async (): Promise<PublisherModelInterface[]> => {
  try {
    const publishers = await Publisher.findAll();
    return publishers;
  } catch (error: any) {
    throw new Error(error);
  }
};

const findByReference = async (
  reference: string
): Promise<PublisherModelInterface | null> => {
  try {
    const publisher = await Publisher.findOne({ where: { reference } });
    return publisher;
  } catch (error: any) {
    throw new Error(error);
  }
};

const update = async (
  publisher: Partial<PublisherModelInterface>,
  id: number
): Promise<boolean> => {
  try {
    const [affectedRows] = await Publisher.update(publisher, { where: { id } });
    return affectedRows > 0;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default {
  create,
  findAll,
  findByReference,
  update,
};