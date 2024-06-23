const { Schema, mongo } = require("mongoose");
const mongoose = require("mongoose");

const draftSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    keywords: {
        type: String
    },
    privacy: {
        type: String,
        enum: ['public', 'private', 'unlisted'],
        default: 'public'
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'deleted'],
        default: 'draft'
    },
    reviews: {
        type: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    videoLink: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.models?.Draft || mongoose.model('Draft', draftSchema)