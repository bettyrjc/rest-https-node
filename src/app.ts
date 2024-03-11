import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  console.log("Hello World");
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });
  server.start();
}
