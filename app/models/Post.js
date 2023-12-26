const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        userId: { type: String, required: true },
        desc: { type: String },
        img: { type: String },
        video: { type: String },
        likes: { type: Array, default: [] },
    },
    {
        collection: 'post',
        timestamps: true,
    },
);

module.exports = mongoose.model('Post', Post);
