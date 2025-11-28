import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function sendEmail({ toEmail, projectName, projectId }) {
  const inviteLink = `${process.env.FRONTEND_URL}/invite?projectId=${projectId}&email=${toEmail}`;

  const mailOptions = {
    from: `"Project Manager" <${process.env.MAIL_SENDER}>`,
    to: toEmail,
    subject: `You have been invited to collaborate on the project: ${projectName}`,
    html: `
    
   <div style="font-family: Arial, sans-serif; padding: 20px">
    
    <h3 style="color: #5865f2;">${projectName}</h3>

    <p style="font-size: 14px; color: #555;">
      Click the button below to join the project:
    </p>

    <a href="${inviteLink}"
      style="
        display: inline-block;
        margin: 20px 0;
        padding: 12px 20px;
        background-color: #5865f2;
        color: white !important;
        text-decoration: none;
        font-weight: bold;
        border-radius: 6px;
      "
    >
      Join Project
    </a>

    <p style="font-size: 13px; color: #777;">
      If you don't have an account yet, you will be asked to sign up.
    </p>

    <hr style="margin-top: 30px; opacity: 0.3;" />

    <small style="font-size: 12px; color: #aaa;">
      If you did not expect this invitation, you can safely ignore this email.
    </small>
  </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invite email sent to:", toEmail);
  } catch (err) {
    console.log("error occured , while sending Email: ", err);
  }
  
}
