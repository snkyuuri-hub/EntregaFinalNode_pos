import { Model } from "@sequelize/core";

interface PublisherModelInterface extends Model {
  id: number;
  name: string;
  country: string;
  foundedYear: number;
  website: string;
}

export default PublisherModelInterface;