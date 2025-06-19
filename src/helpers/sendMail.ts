import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMail {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // email gửi
      pass: process.env.SMTP_PASS, // password ứng dụng
    },
  });

  async sendVerificationEmail(to: string, token: string) {
    const url = `${process.env.APP_URL}/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"No Reply" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Xác nhận đăng ký tài khoản',
      html: `<p>Vui lòng nhấn vào link bên dưới để xác nhận email:</p><a href="${url}">${url}</a>`,
    });
  }
}
