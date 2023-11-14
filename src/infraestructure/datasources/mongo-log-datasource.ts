import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource {



    async saveLogs(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);    
    await newLog.save();
     console.log(newLog.id," created");
    }
    async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs =await LogModel.find({ level: serverityLevel });
        return logs.map(LogEntity.fromObject);
    }
}