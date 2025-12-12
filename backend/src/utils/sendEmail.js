import SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";
dotenv.config();

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
brevo.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export default async function sendEmail({
  fromName,
  fromEmail,
  toEmail,
  projectName,
  projectId,
}) {
  const inviteLink = `${process.env.FRONTEND_URL}/invite?projectId=${projectId}&email=${toEmail}`;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px">
    <h3 style="color: #5865f2;">${fromName} has invited you to join their project: ${projectName}</h3>

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
  </div>
  `;

  try {
    const response = await brevo.sendTransacEmail({
      sender: { name: "Project Manager", email: process.env.MAIL_SENDER },
      to: [{ email: toEmail }],
      subject: `Invitation to collaborate on: ${projectName}`,
      htmlContent,
    });

    console.log("Email sent via Brevo API:", response.messageId || response);
  } catch (err) {
    console.error("Brevo Email API Error:", err);
  }
}
