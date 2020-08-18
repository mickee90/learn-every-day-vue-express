"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = exports.Post = void 0;
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env_config.js")[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
class Post extends sequelize_1.Model {
}
exports.Post = Post;
Post.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    user_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    ingress: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    deleted: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    published_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
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
    tableName: "posts",
    sequelize,
});
exports.Posts = [];
//# sourceMappingURL=Post.js.map