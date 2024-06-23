const { sendMail } = require("./sendMail")

const sendDraftCreationMail = async (to, managerFullName, ownerFullNName, draftTitle, draftId) => {
    await sendMail(to, 'New draft created',
        `New Draft Created
        Hi `+ ownerFullNName + `,
        We are excited to inform you that a new draft titled `+ draftTitle + ` has been created by ` + managerFullName + `.
        Please review the draft and make any necessary adjustments or suggestions.
        To view the draft, please click the button below:
        View Draft
        Thank you for your attention and cooperation.
        Best regards,
        The Team
        © 2024 Your Company. All rights reserved.`,
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Draft Created Notification</title>
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
        <h1>New Draft Created</h1>
      </div>
      <div class="content">
        <p>Hi `+ ownerFullNName + `,</p>
        <p>
          We are excited to inform you that a new draft titled "<strong
            >`+ draftTitle + `</strong
          >" has been created by `+ managerFullName + `.
        </p>
        <p>
          Please review the draft and make any necessary adjustments or
          suggestions.
        </p>
        <p>To view the draft, please click the button below:</p>
        <p style="text-align: center">
          <a href="http://localhost:5173/draft/`+ draftId + `" class="button">View Draft</a>
        </p>
        <p>Thank you for your attention and cooperation.</p>
        <p>Best regards,<br />The Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Youtube Manager. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`
    )
}

module.exports = { sendDraftCreationMail };