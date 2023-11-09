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

    private createLogsPath = () => {
        [this.logPath,
        this.allLogsPath,
        this.lowLogsPath,
        this.mediumLogsPath,
        this.highLogsPath].forEach((path) => {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
        });
    }

    async saveLogs(log: LogEntity): Promise<void> {
        fs.appendFileSync(this.allLogsPath, `${JSON.stringify(log)}\n`);
        const logJSON = `${JSON.stringify(log)}\n`
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
        return Promise.resolve();
    }
    getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}