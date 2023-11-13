import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback
    ) { }
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            this.logRepository.saveLog(
                new LogEntity({
                    message: `Server ${url} is available`,
                    level: LogSeverityLevel.low,
                    origin: "check-service.ts"
                }));
            this.successCallback && this.successCallback();
            return true;
        }
        catch (error) {

            const errorMessage = `${error}`;
            this.errorCallback && this.errorCallback(`${errorMessage}`);
            this.logRepository.saveLog(
                new LogEntity({
                    message: `Server ${url} is not available ${errorMessage}`,
                    level: LogSeverityLevel.high,
                    origin: "check-service.ts"
                }));
            return false;
        }
    }
}