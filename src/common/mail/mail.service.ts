import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE') || false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ) {
    const html = this.renderTemplate(templateName, context);

    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject,
      html: html,
    });

    this.logger.log(`Email sent to ${to}`);
  }

  private renderTemplate(templateName: string, context: Record<string, any>): string {
    const templatePath = path.join(process.cwd(), 'src/common/mail/templates', `${templateName}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const compiled = handlebars.compile(templateSource);
    return compiled(context);
  }
}
