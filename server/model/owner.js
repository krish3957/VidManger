const { Schema, mongo } = require("mongoose");
const mongoose = require("mongoose");

const ownerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    expiration: {
        type: Number,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Manager'
    }
}, { timestamps: true })


module.exports = mongoose.models?.Owner || mongoose.model('Owner', ownerSchema)