"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Users", {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 2,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        zip_code: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        disabled: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
        },
        banned: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
        },
        country_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 1,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Users",
    });
};
//# sourceMappingURL=Users.js.map