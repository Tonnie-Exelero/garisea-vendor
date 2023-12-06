import { decryptData } from "@core/utils/encryption";
import nodemailer from "nodemailer";

type EmailPayload = {
  pl: string;
};

const SMTP_PORT: any =
  process.env.NODE_ENV === "production"
    ? process.env.SMTP_PORT_LIVE
    : process.env.SMTP_PORT_DEV;

// Replace with your SMTP credentials
const smtpOptions = {
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: parseInt(SMTP_PORT),
  secure: process.env.NODE_ENV === "production" ? true : false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  const { pl } = data;

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...decryptData(pl),
  });
};
