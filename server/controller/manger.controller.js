const manager = require("../model/Manager");
const owner = require("../model/owner");
const createManager = async (req, res) => {
    const { email, fullName } = req.body;
    try {
        const newManager = new manager({ email, fullName });
        await newManager.save();
        res.status(201).json(newManager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getManagers = async (req, res) => {
    const { page } = req.params;
    if (!page)
        page = 1;
    try {
        const managers = await manager.find().skip((page - 1) * 10).limit(10);
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getManager = async (req, res) => {
    const { email } = req.params;
    try {
        //Check if the manager exists
        const foundManager = await manager.findOne({ email });
        res.status(200).json(foundManager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateManager = async (req, res) => {
    const { email } = req.params;
    const { ownerId } = req.body;
    try {
        const foundManager = await manager.findOne({ email });
        if (!foundManager.owners.includes(ownerId)) {
            foundManager.owners.push(ownerId);
            foundManager.save();
        }

        await owner.findByIdAndUpdate(
            ownerId,
            { manager: foundManager._id }
        );


        res.status(200).json(foundManager);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { createManager, getManagers, getManager, updateManager };