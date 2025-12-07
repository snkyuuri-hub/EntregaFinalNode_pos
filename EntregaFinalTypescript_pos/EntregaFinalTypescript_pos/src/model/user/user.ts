import connection from "../../config/database";
import { DataTypes } from "@sequelize/core";
import UserModelInterface from "./Interface/UserModelInterface";

const User = connection.define<UserModelInterface>('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

export default User;