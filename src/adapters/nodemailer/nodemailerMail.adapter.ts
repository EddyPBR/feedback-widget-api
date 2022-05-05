import { MailAdapter, SendMailData } from "~adapters/Mail.adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "52f70d4f39f280",
    pass: "4392bc5bc2e416",
  },
});

class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { body, subject } = data;

    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Edvaldo Junior <edvaldojunior1310@gmail.com>",
      subject,
      html: body,
    });
  }
}

export default NodemailerMailAdapter;
