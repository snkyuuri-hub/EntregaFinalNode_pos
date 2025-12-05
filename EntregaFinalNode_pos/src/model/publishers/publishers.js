import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const Publisher = sequelize.define("publisher", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "books",
      key: "id",
    },
  },
});

export default Publisher;