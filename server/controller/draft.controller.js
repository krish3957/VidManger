const { google } = require("googleapis");
const draft = require("../model/draft");
const owner = require("../model/owner");
const { createUrlReadStream } = require("../lib/createReadableStream");
const { sendMail } = require("../lib/sendMail");
const Manager = require("../model/Manager");
const { sendDraftCreationMail } = require("../lib/sendDraftCreationMail");
const { sendReviewMail } = require("../lib/sendDraftReviewMail");
const { sendApprovedMail } = require("../lib/sendApprovedMail");

const createDraft = async (req, res) => {
  const { title, description, content, category, keywords, privacy, ownerId, manager, status, thumbnail } = await req.body;
  console.log('Content', content);
  try {
    const newDraft = new draft({
      title,
      description,
      category,
      keywords,
      privacy,
      content,
      owner: ownerId,
      manager,
      status,
      thumbnail
    });
    await newDraft.save();
    const draftOwner = await owner.findById(ownerId);
    //Increase manager total Drafts by 1
    const draftManager = await Manager.findById(manager);
    draftManager.totalDrafts += 1;
    await draftManager.save();

    sendDraftCreationMail(draftOwner.email, draftManager.fullName, draftOwner.fullName, title, newDraft._id);


    return res.status(201).json(newDraft);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: "Internal server error" });
  }
}

const updateDraft = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, keywords, content, privacy, ownerId, managerId, status, thumbnail } = await req.body;
  try {
    const updatedDraft = await draft.findByIdAndUpdate(id, {
      title,
      description,
      category,
      keywords,
      privacy,
      content,
      ownerId,
      managerId,
      status,
      thumbnail
    }, { new: true });

    const owner = await owner.get
    return res.status(200).json(updatedDraft);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ message: "Internal server error" });
  }
}

const getDrafts = async (req, res) => {
  const { owner, manager } = req.query;


  try {
    const drafts = await draft.find({ owner, manager });
    return res.status(200).json(drafts);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ message: "Internal server error" });
  }
}

const getYourDrafts = async (req, res) => {
  const { ownerId } = req.params;

  console.log(ownerId);
  try {
    const drafts = await draft.find({ owner: ownerId }).sort({ createdAt: -1 });
    return res.status(200).json(drafts);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ message: "Internal server error" });
  }
}

const acceptDraft = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const draftToUpload = await draft.findById(id);

    if (!draft) {
      return res.status(404).json({ message: 'Draft not found' });
    }

    // Upload video to YouTube
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    const draftOwner = await owner.findById(draftToUpload.owner);
    oauth2Client.setCredentials({
      access_token: draftOwner.accessToken,
      refresh_token: draftOwner.refreshToken
    });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const videoFile = createUrlReadStream(draftToUpload.content);

    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: draftToUpload.title,
          description: draftToUpload.description,
          tags: draftToUpload.keywords.split(','),
        },
        status: {
          privacyStatus: draft.privacy,
        },
      },
      media: {
        body: videoFile,
      },
    }).then(async (result) => {
      // Update draft status
      draftToUpload.status = 'published';
      await draftToUpload.save();

      const updatedDraft = await draft.findByIdAndUpdate(id, {
        videoLink: `https://www.youtube.com/watch?v=${result.data.id}`,
      });

      const manager = await Manager.findById(draftToUpload.manager);
      manager.accepted += 1;
      manager.save();
      sendApprovedMail(manager.email, draftToUpload.title, manager.fullName, draftOwner.fullName, `https://www.youtube.com/watch?v=${result.data.id}`)
      res.status(200).json({ message: 'Video uploaded successfully', });
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
}

const addReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  try {
    const reviewedDraft = await draft.findById(id);
    const draftManager = await Manager.findById(draft.manager);
    const draftOwner = await owner.findById(draft.owner);
    const updatedDraft = await draft.findByIdAndUpdate(id, {
      $push: { reviews: review },
    }, { new: true });

    sendReviewMail(draftManager.email, draftManager.fullName, reviewedDraft.title, id, draftOwner.email);
    return res.status(200).json(updatedDraft);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getDraftById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundDraft = await draft.findById(id);
    res.status(200).json(foundDraft);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



module.exports = { createDraft, getDrafts, updateDraft, getYourDrafts, acceptDraft, addReview, getDraftById };