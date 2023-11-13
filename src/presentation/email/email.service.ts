import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];

}

interface Attachment {
    filename: string;
    path: string;
}

interface EmailServiceProps {
    service:string,
    user:string,
    pass:string

}

export class EmailService {
   
    private transport!:nodemailer.Transporter;

    constructor({service,user,pass}:EmailServiceProps){
         this.transport = nodemailer.createTransport({
            service,
            auth: {
                user,
                pass
            }
        });

    }
    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options
        try {
            await this.transport.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
                    
            return true;
        } catch (error) {            
            return false;
        }

    }

    sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = "Logs del Sistema";
        const htmlBody = `<h1>Logs en el SISTEMA</h1>`;
        const attachments: Attachment[] = [
            {
                filename: "logs-all.log",
                path: "./logs/logs-all.log"
            },
            {
                filename: "logs-high.log",
                path: "./logs/logs-high.log"
            },
            {
                filename: "logs-medium.log",
                path: "./logs/logs-medium.log"
            }
        ];
        return this.sendEmail({ to, subject, htmlBody, attachments });

    }


}