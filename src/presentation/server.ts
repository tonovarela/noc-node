
import { envs } from "../config/plugins/envs.plugins";

import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log-datasource";
import { PostgresLogDataSouce } from "../infraestructure/datasources/postgres-log.datasouce";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepositoryFileSystem = new LogRepositoryImpl(new FileSystemDataSource());
const logRepositoryMongo = new LogRepositoryImpl(new MongoLogDataSource());
const logRepositoryPostgres = new LogRepositoryImpl(new PostgresLogDataSouce());

const { MAILER_SERVICE: service, MAILER_EMAIL: user, MAILER_SECRET_KEY: pass } = envs;
const emailService = new EmailService({ service, user, pass });


export class ServerApp {
    public static async start() {
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
        CronService.createJob("*/5 * * * * *", async () => {
            const date = new Date();
            await new CheckServiceMultiple([logRepositoryFileSystem,logRepositoryMongo,logRepositoryPostgres
            ]).execute("https://www.google.com");
            console.log("Cada 5 segundos ", date);
        });

        //const logs = await logRepository.getLogs(LogSeverityLevel.low);
        //console.log(logs);
    }
}

