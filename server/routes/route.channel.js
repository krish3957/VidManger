const channelRouter = require('express').Router();
const channelController = require('../controller/channel.controller');

channelRouter.post("/", channelController.getOwnerYouTubeChannels);
channelRouter.get("/:ownerId", channelController.getChannel);

module.exports = channelRouter;