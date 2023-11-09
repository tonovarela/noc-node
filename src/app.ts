import { ServerApp } from "./presentation/server";
import { FileSystemDataSource } from './infraestructure/datasources/file-system.datasource';
import { envs } from "./config/plugins/envs.plugins";


(() => {
    main();
})();


function main() {
//    ServerApp.start()      
console.log(envs)
    
}
