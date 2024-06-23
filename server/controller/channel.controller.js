const { google } = require('googleapis');
const channel = require('../model/channel');
const axios = require("axios");
const { default: mongoose } = require('mongoose');

const getOwnerYouTubeChannels = async (req, res) => {
    const { owner } = req.body;
    try {
        const findChannel = await channel.findOne({ owner: owner._id });
        await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=AIzaSyBytyFO6SAL4mJPDPCLKWz7D7sSiTDBLaI`, {
            headers: {
                Authorization: `Bearer ${owner.accessToken}`
            }
        }).then(async (response) => {
            if (findChannel) {
                const updatedChannel = await channel.findOneAndUpdate({ owner: owner._id }, {
                    name: response.data.items[0].snippet.title,
                    youtubeChannelId: response?.data?.items[0].id,
                    thumbnail: response?.data?.items[0].snippet.thumbnails.default.url,
                    subscriberCount: response?.data?.items[0].statistics.subscriberCount,
                    viewCount: response?.data?.items[0].statistics.viewCount,
                    customUrl: response?.data?.items[0].snippet.customUrl,
                }, { new: true });
                return res.status(200).json({ message: 'Channel updated successfully', updatedChannel });
            }
            const newChannel = new channel({
                name: response?.data?.items[0].snippet.title,
                owner: owner._id,
                youtubeChannelId: response?.data?.items[0].id,
                thumbnail: response?.data?.items[0].snippet.thumbnails.high.url,
                subscriberCount: response?.data?.items[0].statistics.subscriberCount,
                viewCount: response?.data?.items[0].statistics.viewCount,
                customUrl: response?.data?.items[0].snippet.customUrl,
            });
            await newChannel.save();
            return res.status(200).json({ message: 'Channel added successfully' });

        }).catch((error) => {
            console.log(error);
            return null;
        });
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ message: error });
    }
};

const getChannel = async (req, res) => {
    const { ownerId } = req.params;

    try {
        const foundChannel = await channel.findOne({ owner: new mongoose.Types.ObjectId(ownerId) }).populate({ path: 'owner', select: 'fullName email' });
        res.status(200).json(foundChannel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getOwnerYouTubeChannels, getChannel };