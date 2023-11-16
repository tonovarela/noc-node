import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSource implements LogDataSource {
    private readonly logPath: string = 'logs';
    private readonly allLogsPath: string = "logs/logs-all.log";

    private readonly lowLogsPath: string = "logs/logs-low.log";
    private readonly mediumLogsPath: string = "logs/logs-medium.log";
    private readonly highLogsPath: string = "logs/logs-high.log";

    constructor() {
        this.createLogsPath();
    }
    getLogById(id: number): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

    private createLogsPath = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath].forEach((path) => {
                if (!fs.existsSync(path)) {
                    fs.writeFileSync(path, '');
                }
            });
    }

    async saveLogs(log: LogEntity): Promise<void> {
        const logJSON = `${JSON.stringify(log)}\n`                            
        fs.appendFileSync(this.allLogsPath, `${logJSON}`);                        
        switch (log.level) {
            case LogSeverityLevel.low:
                fs.appendFileSync(this.lowLogsPath, logJSON);
                break;
            case LogSeverityLevel.medium:
                fs.appendFileSync(this.mediumLogsPath, logJSON);
                break;
            case LogSeverityLevel.high:
                fs.appendFileSync(this.highLogsPath, logJSON);
                break;
        }
        
    }
    async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (serverityLevel) {
            case LogSeverityLevel.low:
                return this.getLogFilePath(this.lowLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogFilePath(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogFilePath(this.highLogsPath);
            default:
                return this.getLogFilePath(this.allLogsPath);
        }
    }

    private getLogFilePath(path: string): LogEntity[] {
        const content = fs.readFileSync(path, 'utf8');
        if (content=="") return [];
        return content.split('\n').map(log => LogEntity.fromJSON(log));
    }

}