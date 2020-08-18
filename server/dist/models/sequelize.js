"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env_config.js")[env];
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
//# sourceMappingURL=sequelize.js.map