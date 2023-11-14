import 'dotenv/config';
import * as env from 'env-var';



export const envs ={
    PORT:env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL:env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY:env.get('MAILER_SECRET_KEY').required().asString(),
    PRODUCTION: env.get('PRODUCTION').required().asBool(),
    MAILER_SERVICE : env.get('MAILER_SERVICE').required().asString(),

    //MONGODB
    MONGO_URL : env.get('MONGO_URL').required().asString(),
    MONGO_USER : env.get('MONGO_USERNAME').required().asString(),
    MONGO_PASSWORD : env.get('MONGO_PASSWORD').required().asString(),
    MONGO_DB : env.get('MONGO_DB').required().asString(),
}
