import {
  DEBUG,
  MAIL_FROM,
  MAIL_FROM_NAME,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_REJECT_UNAUTHORIZED_TLS,
  SMTP_SECURE_ENABLED,
  SMTP_USER,
} from '@/lib/consts';
import RegisteredEmail from '@/lib/email/emails/auth/registered';
import { InvalidInputError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { render } from '@react-email/render';
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export const IS_SMTP_CONFIGURED = Boolean(SMTP_HOST && SMTP_PORT && MAIL_FROM && MAIL_FROM_NAME);

interface Props {
  to: string;
  subject: string;
  text?: string;
  html: string;
  replyTo?: string;
}
export const sendMail = async (emailData: Props): Promise<boolean> => {
  if (!IS_SMTP_CONFIGURED) {
    logger.info('SMTP is not configured, skipping email sending');
    return false;
  }

  try {
    const transporter = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE_ENABLED,
      auth: {
        type: 'LOGIN',
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: SMTP_REJECT_UNAUTHORIZED_TLS,
      },
      logger: DEBUG,
      debug: DEBUG,
    } as SMTPTransport.Options);

    await transporter.sendMail({ from: `${MAIL_FROM_NAME} <${MAIL_FROM}>`, ...emailData });

    return true;
  } catch (error) {
    logger.error(error, 'Error in sendEmail');
    throw new InvalidInputError('SMTP認証情報が間違っています');
  }
};

export const sendRegisteredEmail = async (user: { email: string }): Promise<boolean> => {
  const html = await render(await RegisteredEmail());
  return await sendMail({
    to: user.email,
    subject: '登録が完了しました',
    html,
  });
};
