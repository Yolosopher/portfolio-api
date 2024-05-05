import App from "./app";
import CONFIG from "./config";
import { ICurrentUser } from "./global";

declare global {
  namespace Express {
    interface Request {
      current_user?: ICurrentUser;
    }
  }
}
new App({
  port: CONFIG.port,
  mode: CONFIG.node_env,
  mongo_url: CONFIG.mongo_url,
}).runServer();
