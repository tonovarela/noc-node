import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}
export class PostgresLogDataSouce implements LogDataSource {
    getLogById(id: number): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    async saveLogs(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const data = { ...log, level };
        await prismaClient.logModel.create({data});
    }
    async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[serverityLevel];
        return (await prismaClient
            .logModel
            .findMany({ where: { level } }))
            .map(LogEntity.fromObject);

    }
}