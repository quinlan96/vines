"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    vines: [mongoose_1.Schema.Types.ObjectId]
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Playlist', schema);
//# sourceMappingURL=Playlist.js.map