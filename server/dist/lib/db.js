"use strict";
/**
 * @file Initialises the MongoDB connection.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGODB_CONNECTION_STRING;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    authSource: 'admin'
};
function connect() {
    return mongoose_1.default.connect(uri, options);
}
exports.default = connect;
//# sourceMappingURL=db.js.map