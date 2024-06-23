// backend/server.js
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const ownerRouter = require('./routes/route.owner');
const mangerRouter = require('./routes/route.manager');
const channelRouter = require('./routes/route.channel');
const cors = require('cors');
const draftRouter = require('./routes/route.draft');
const { sendMail } = require('./lib/sendMail');

const fullName = "Krish Parekh";
const title = "Mail";
const _id = "1234";
const email = "kpparekh81602@gmail.com";

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api/owner", ownerRouter);
app.use("/api/manager", mangerRouter);
app.use("/api/channel", channelRouter);
app.use("/api/draft", draftRouter);

const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve the files in the uploads directory
app.use('/uploads', express.static(uploadDir));

app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Get the uploaded file info
        const uploadedFile = files.file;
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(uploadedFile.path)}`;

        // Return the URL of the uploaded file
        res.json({ fileUrl });
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
