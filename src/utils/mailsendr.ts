import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { DAUM_EMAIL, DAUM_PASSWORD } from 'config';
import { HttpException } from '@/exceptions/HttpException';
export const smtpTransport = nodemailer.createTransport({
  service: 'Daum',
  host: 'smtp.daum.net',
  port: 465,
  auth: {
    user: DAUM_EMAIL,
    pass: DAUM_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const sendMail =async (toEmail: string, message: string): Promise<SentMessageInfo> => {
    const mailOptions = {
        from: `"기록으로 남기다 👻" <admin@travel-report.xyz>`,
        to: toEmail,
        subject: "[기록으로 남기다] 이메일 인증",
        text: message
    }
    const sentMessageInfo = smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) throw new HttpException(500, '이메일 전송에 실패하였습니다.');
        return info;
    });
    return sentMessageInfo;
}

export default sendMail;
