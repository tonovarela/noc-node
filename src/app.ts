import { ServerApp } from "./presentation/server";

import { envs } from "./config/plugins/envs.plugins";


(() => {
    main();
})();


function main() {
    ServerApp.start()
    //console.log(envs)

}
