import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { config } from "@/lib/config";

const { AWS_REGION, AWS_AK, AWS_SECRET_ACCESS_KEY, SENDER_EMAIL } = process.env;

const client = new SESv2Client({
  region: AWS_REGION!,
  credentials: {
    accessKeyId: AWS_AK!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
});

const sendEmail = async (
  replyTo: string,
  subject: string,
  html: string,
  toAddresses?: string[]
) => {
  try {
    const command = new SendEmailCommand({
      FromEmailAddress: SENDER_EMAIL!,
      Destination: {
        ToAddresses: toAddresses || [config.adminEmail],
      },
      ReplyToAddresses: [replyTo],
      FeedbackForwardingEmailAddress: config.adminEmail,
      Content: {
        Simple: {
          Subject: {
            Data: subject,
          },
          Body: {
            Html: {
              Data: html,
            },
          },
        },
      },
    });
    await client.send(command);
  } catch (error: any) {
    console.log("Error sending email:", error.message);
  }
};

export { sendEmail };
