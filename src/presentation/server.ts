
import { envs } from "../config/plugins/envs.plugins";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/logs/email/send-logs";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";



//  const transport = nodemailer.createTransport({
//         service: envs.MAILER_SERVICE,
//         auth: {
//             user: envs.MAILER_EMAIL,
//             pass: envs.MAILER_SECRET_KEY
//         }
//     });

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const { MAILER_SERVICE: service, MAILER_EMAIL: user, MAILER_SECRET_KEY: pass } = envs;
const emailService = new EmailService({ service, user, pass });


export class ServerApp {
    static start() {
        console.log("Server is running");
        // new SendEmailLogs(fileSystemLogRepository,
        //                   emailService.sendEmailWithFileSystemLogs)
        //     .execute(["mestelles@litoprocess.com"]);
        // console.log("Correo enviado");
        // const emailService=  new EmailService(fileSystemLogRepository);
        // emailService.sendEmail({
        //     to:"mestelles@litoprocess.com",
        //     subject:"test",
        //     htmlBody:"<h1>Este es una prueba del logs en el SISTEMAS</h1>"
        // })


        //emailService.sendEmailWithFileSystemLogs("mestelles@litoprocess.com")
        // CronService.createJob("*/5 * * * * *", async() => {
        //     const date = new Date();            
        //     await new CheckService(fileSystemLogRepository).execute("http://localhost:3000");
        //     console.log("Cada 5 segundos ", date);
        // });
    }
}

