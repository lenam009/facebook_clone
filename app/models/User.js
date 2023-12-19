const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true, unique: false },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },
        followers: { type: Array, default: [] },
        followings: { type: Array, default: [] },
        isAdmin: { type: Boolean, default: false },
        desc: { type: String, default: '' },
        city: { type: String, default: '' },
        from: { type: String, default: '' },
        relationship: { type: Number, enum: [1, 2, 3] },
    },
    {
        collection: 'user',
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
