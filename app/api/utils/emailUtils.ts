import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { config } from "@/app/utils/config";

// Lazy initialization of SES client
let client: SESv2Client | null = null;

const getSESClient = () => {
  if (!client) {
    const { AWS_REGION, AWS_AK, AWS_SECRET_ACCESS_KEY } = process.env;

    // Validate required environment variables at runtime
    if (!AWS_REGION) {
      throw new Error("AWS_REGION environment variable is required");
    }
    if (!AWS_AK) {
      throw new Error("AWS_AK environment variable is required");
    }
    if (!AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS_SECRET_ACCESS_KEY environment variable is required");
    }

    client = new SESv2Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_AK,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return client;
};

const sendEmail = async (
  replyTo: string,
  subject: string,
  html: string,
  toAddresses?: string[]
) => {
  try {
    const { SENDER_EMAIL } = process.env;

    // Validate SENDER_EMAIL at runtime
    if (!SENDER_EMAIL) {
      throw new Error("SENDER_EMAIL environment variable is required");
    }

    const command = new SendEmailCommand({
      FromEmailAddress: SENDER_EMAIL,
      Destination: {
        ToAddresses: toAddresses ?? [config.adminEmail],
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
    await getSESClient().send(command);
  } catch (error: any) {
    console.log("Error sending email:", error.message);
  }
};

export { sendEmail };
