import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import {  MongoDataBase } from "./data/mongo";
import { ServerApp } from "./presentation/server";


(async () => {
    main();
})();


async function main() {

    
    await MongoDataBase.connect(        
        {
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB
        });        
        ServerApp.start();

    

}
