import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class ServerApp {
    static start() {
        console.log("Server is running");
        CronService.createJob("*/5 * * * * *", async() => {
            const date = new Date();            
            await new CheckService(fileSystemLogRepository).execute("http://localhost:3000");
            console.log("Cada 5 segundos ", date);
        });
    }
}

