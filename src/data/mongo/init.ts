import mongoose from "mongoose";

interface ConnectionProperties {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {
    static async connect(properties: ConnectionProperties): Promise<boolean> {
        const { mongoUrl, dbName } = properties
        try {
            await mongoose.connect(mongoUrl, { dbName });
            console.log("MongoDB connected");
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    }
}