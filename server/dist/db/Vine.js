"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vine = void 0;
const mongoose_1 = require("mongoose");
const VineSchema = new mongoose_1.Schema({
    videoId: String,
    title: String,
    description: String,
    url: String,
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Creator'
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
VineSchema
    .virtual('vineUrl')
    .get(function () {
    return `${process.env.API_BASE}/static/vines/${this.videoId}/${this.videoId}.mp4`;
});
VineSchema
    .virtual('thumbnailUrl')
    .get(function () {
    return `${process.env.API_BASE}/static/vines/${this.videoId}/${this.videoId}.jpg`;
});
// schema.plugin(mongooseFuzzySearching, {
// 	fields: ['title', 'description']
// })
const Vine = mongoose_1.model('Vine', VineSchema);
exports.Vine = Vine;
//# sourceMappingURL=Vine.js.map