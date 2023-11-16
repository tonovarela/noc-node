import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDataSource {
    abstract saveLogs(log:LogEntity): Promise<void>;
    abstract getLogs(serverityLevel:LogSeverityLevel): Promise<LogEntity[]>;
    abstract getLogById(id:number): Promise<LogEntity[]>;
}






