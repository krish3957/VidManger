const ownerController = require('../controller/owner.controller');

const express = require('express');
const ownerRouter = express.Router()

ownerRouter.post("/", ownerController.newOwner);
ownerRouter.get("/:email", ownerController.getOwner);
ownerRouter.put("/assign", ownerController.assignManager);
ownerRouter.get("/expiration/:email", ownerController.getTokenExpiration);
ownerRouter.put("/", ownerController.updateOwner);

module.exports = ownerRouter;