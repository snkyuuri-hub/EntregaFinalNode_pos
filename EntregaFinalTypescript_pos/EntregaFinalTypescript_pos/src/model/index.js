import sequelize from "../config/database.js";
import Book from "./book/Book.js";
import Publisher from "./publishers/Publisher.js";
import User from "./user/user.js";

Book.hasMany(Publisher, {
  foreignKey: {
    name: "bookId",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Publisher.belongsTo(Book, {
  foreignKey: {
    name: "bookId",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

sequelize
  .sync({
    force: false,
    alter: true,
  })
  .then(() => {
    console.log("Todas as tabelas foram sincronizadas com sucesso.");
  });

export default {
  Book,
  Publisher,
  User,
};