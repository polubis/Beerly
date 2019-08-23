import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export interface IEmailService {
  sendMail: (consumer: string, subject?: string, text?: string) => void;
}

class EmailService implements IEmailService {
  public sendMail = async (consumer: string, subject?: string, text?: string) => {
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
      subject,
      text
    };

    await transport.sendMail(options);
  };
}

export default new EmailService();
