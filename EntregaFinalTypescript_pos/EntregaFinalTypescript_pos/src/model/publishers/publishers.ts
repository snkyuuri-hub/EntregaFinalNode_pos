import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database"; 
import PublisherModelInterface from "./Interface/PublisherModelInterface";

const Publisher = sequelize.define<PublisherModelInterface>("Publisher", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foundedYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reference: {
    type: DataTypes.STRING,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "ativo",
  },
});

export default Publisher;