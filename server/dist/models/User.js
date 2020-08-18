"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.User = void 0;
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env_config.js")[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    user_type_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 2,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    zip_code: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    disabled: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    banned: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    country_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "users",
    sequelize,
});
exports.Users = [];
//# sourceMappingURL=User.js.map