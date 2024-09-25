import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import * as nodemailer from 'nodemailer';

import { config } from 'src/config/config';

@Injectable()
export class MailService {
  async send_email(subject: string, html: string, to_email: string) {
    try {
      const mail_transport = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        auth: { user: config.smtp.username, pass: config.smtp.password },
      });

      const res = await mail_transport.sendMail({
        from: config.email.from,
        to: to_email,
        replyTo: config.email.from,
        subject: subject,
        html: html,
      });

      console.log('email log', { res });
    } catch {
      throw new GraphQLError('Failed to send email');
    }
  }
}
