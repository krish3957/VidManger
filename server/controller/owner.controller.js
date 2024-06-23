const owner = require("../model/owner.js");
const CryptoJS = require("crypto-js");
const newOwner = async (req, res) => {
    const { email, fullName, accessToken, refreshToken, expiration, manager } = await req.body;
    try {
        const newOwner = new owner({
            email: email,
            fullName: fullName,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiration: expiration,
            manager: manager
        });
        await newOwner.save();
        const { _id } = newOwner;
        res.status(201).json(_id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOwner = async (req, res) => {
    const { email } = req.params;
    try {
        const findOwner = await owner.findOne({
            email: email
        });
        res.status(200).json(findOwner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const assignManager = async (req, res) => {
    const { email, manager } = req.body;
    try {
        const owner = await owner.findOne({ email: email });
        if (owner === null) {
            res.status(404).json({ message: "Owner not found" });
        }
        await owner.findOneAndUpdate({ email: email }, {
            manager: manager
        });
        res.status(200).json({ message: "Manager assigned successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTokenExpiration = async (req, res) => {
    const { email } = req.params;
    try {
        const owner = await owner.findOne({
            email: email
        });
        if (owner === null) {
            res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json({ expiration: owner.expiration });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOwner = async (req, res) => {
    const { email, fullName, accessToken, refreshToken, expiration, manager } = req.body;

    try {
        // Encrypt tokens
        const encryptedAccessToken = accessToken;
        const encryptedRefreshToken = refreshToken;

        const result = await owner.findOneAndUpdate(
            { email: email },
            {
                fullName: fullName,
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                expiration: expiration,
                manager: manager
            },
            { new: true } // Return the updated document
        );

        if (result === null) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.status(200).json(result._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    newOwner,
    getOwner,
    assignManager,
    getTokenExpiration,
    updateOwner
}