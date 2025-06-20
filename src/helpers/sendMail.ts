import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMail {
  constructor(private readonly mailerService: MailerService) {}
  public testSendMail(
    to: string, 
    name: string,
    activationCode: string,
  ) {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        template: 'register.hbs',
        context: {
          name: name,
          activationCode: activationCode,
        },
      })
      .then(() => {})
      .catch(() => {});

    return 'ok';
  }
}
