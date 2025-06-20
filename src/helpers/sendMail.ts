import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMail {

  constructor(private readonly mailerService: MailerService) {}
  public testSendMail() {
    this.mailerService
      .sendMail({
        to: 'shawluong@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome to APP NESTJS </b>', // HTML body content
      })
      .then(() => {})
      .catch(() => {});

      return "ok"
  }
}
