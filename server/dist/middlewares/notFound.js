"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
//# sourceMappingURL=notFound.js.map