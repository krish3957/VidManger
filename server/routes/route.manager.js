const managerRouter = require('express').Router();
const managerController = require('../controller/manger.controller');

managerRouter.post("/", managerController.createManager);
managerRouter.get("/:page", managerController.getManagers);
managerRouter.get("/find/:email", managerController.getManager);
managerRouter.put("/:email", managerController.updateManager);

module.exports = managerRouter;