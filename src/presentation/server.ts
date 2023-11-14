
import { envs } from "../config/plugins/envs.plugins";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log-datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//const logRepository = new LogRepositoryImpl(new FileSystemDataSource());
const logRepository = new LogRepositoryImpl(new MongoLogDataSource());
const { MAILER_SERVICE: service, MAILER_EMAIL: user, MAILER_SECRET_KEY: pass } = envs;
const emailService = new EmailService({ service, user, pass });


export class ServerApp {
    public  static async start() {        
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
        //     await new CheckService(logRepository).execute("https://www.google.com");
        //     console.log("Cada 5 segundos ", date);
        // });
        const logs = await logRepository.getLogs(LogSeverityLevel.medium);
        console.log(logs);
    }
}

