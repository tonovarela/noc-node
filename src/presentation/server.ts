import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class ServerApp {
    static start() {
        console.log("Server is running");
        CronService.createJob("*/5 * * * * *", () => {
            const date = new Date();
            console.log("Cada 5 segundos ", date);
            new CheckService(() => console.log("Check service is OK"),
                (error: string) => console.log(error))
                .execute("https://www.google.com");

        });
    }


}