export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}
export interface LogEntityProps {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;

}
export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor({ message, level, origin, createdAt = new Date() }: LogEntityProps) {
        this.level = level;
        this.origin = origin;
        this.message = message;
        this.createdAt = createdAt
    }


    static fromJSON(json: string): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse(json);
        if (!message) {
            throw new Error('message is required');
        }
        if (!level) {
            throw new Error('level is required');
        }
        const log = new LogEntity({ message, level, origin, createdAt: new Date(createdAt) });
        return log;
    }
}