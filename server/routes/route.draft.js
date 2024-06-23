const { createDraft, getDrafts, updateDraft, getYourDrafts, acceptDraft, addReview, getDraftById } = require('../controller/draft.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

const draftRouter = require('express').Router();
draftRouter.post('/', createDraft);
draftRouter.get('/', getDrafts);
draftRouter.get('/find/:id', getDraftById);
draftRouter.get('/owner/:ownerId', getYourDrafts);
draftRouter.put('/:id', updateDraft);
draftRouter.post('/:id/approve', acceptDraft);
draftRouter.put('/:id/review', addReview);


module.exports = draftRouter;