const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const managerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    }],
    total: {
        type: Number,
        default: 0
    },
    accepted: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

module.exports = mongoose.models?.Manager || mongoose.model('Manager', managerSchema)