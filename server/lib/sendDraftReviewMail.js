const { sendMail } = require("./sendMail")
const sendReviewMail = async (to, fullName, title, _id) => {
  await sendMail(to, 'Your draft has been reviewed',
    `Draft Changes Suggested
                  Hi`+ fullName + `,
  
              We hope this message finds you well.
  
  We wanted to inform you that`+ fullName + `has suggested some changes to their draft titled ` + title + `.
  Please review the suggested changes and provide your feedback or approval.
  To view the draft and the suggested changes, please click the button below:
              View Draft
  Thank you for your prompt attention to this matter.
  Best regards,The Team
  
  © 2024 Youtube manager.All rights reserved.`,
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Draft Changes Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }
        .header h1 {
          margin: 0;
          color: #4caf50;
        }
        .content {
          padding: 20px 0;
        }
        .content p {
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          padding: 10px 0;
          border-top: 1px solid #ddd;
          font-size: 0.9em;
          color: #777;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin: 20px 0;
          font-size: 1em;
          color: #fff;
          background-color: #4caf50;
          border-radius: 5px;
          text-decoration: none;
        }
        .button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Draft Changes Suggested</h1>
        </div>
        <div class="content">
          <p>Hi `+ fullName + `,</p>
          <p>We hope this message finds you well.</p>
          <p>
            We wanted to inform you that `+ fullName + ` has suggested some changes
            to their draft titled "<strong>`+ title + `</strong>".
          </p>
          <p>
            Please review the suggested changes and provide your feedback or
            approval.
          </p>
          <p>
            To view the draft and the suggested changes, please click the button
            below:
          </p>
          <p style="text-align: center">
            <a href="http://localhost:5173/draft/`+ _id + `" class="button">View Draft</a>
          </p>
          <p>Thank you for your prompt attention to this matter.</p>
          <p>Best regards,<br />The Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Youtube manager. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `);
}

module.exports = { sendReviewMail }