"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: error.message,
        data: error.data,
        stack: process.env.NODE_ENV === "production" ? "No stack here" : error.stack,
    });
};
//# sourceMappingURL=errorHandling.js.map