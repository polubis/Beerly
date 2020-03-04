import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

import { EmailConfig } from '../emails/EmailConfig';

export interface IEmailService {
  sendMail: (consumer: string, emailConfig: EmailConfig) => void;
}

class EmailService implements IEmailService {
  public sendMail = async (consumer: string, emailConfig: EmailConfig) => {
    const transport = createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const options: MailOptions = {
      from: process.env.MAIL_USER,
      to: consumer,
      subject: emailConfig.subject,
      text: emailConfig.text,
      html: emailConfig.html
    };

    await transport.sendMail(options);
  };
}

export default new EmailService();
