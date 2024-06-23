const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    youtubeChannelId: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    subscriberCount: {
        type: Number,
        required: true,
    },
    viewCount: {
        type: Number,
    },
    customUrl: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.models?.Channel || mongoose.model('Channel', channelSchema);