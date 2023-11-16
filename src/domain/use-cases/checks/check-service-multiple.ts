import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepositorys: LogRepository[],
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback
    ) { }

    private callLogs(log: LogEntity) {
        this.logRepositorys.forEach((logRepository) => {
            logRepository.saveLog(log);
        });

    }
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message: `Server ${url} is available`,
                level: LogSeverityLevel.low,
                origin: "check-service.ts"
            })
            this.callLogs(log);

            this.successCallback && this.successCallback();

            return true;
        }
        catch (error) {
            const errorMessage = `${error}`;
            this.errorCallback && this.errorCallback(`${errorMessage}`);
            const log = new LogEntity({
                message: `Server ${url} is not available ${errorMessage}`,
                level: LogSeverityLevel.high,
                origin: "check-service.ts"
            });
            this.callLogs(log);
            return false;
        }
    }
}