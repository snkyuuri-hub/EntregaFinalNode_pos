import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js"

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false  
    }
})

export default User