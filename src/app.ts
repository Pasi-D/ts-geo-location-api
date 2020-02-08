import * as express from "express";
import * as bodyParser from "body-parser";

import IController from "interfaces/controllers/controller.interface";

import accessEnv from "config/accessEnv";

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen(): void {
    const PORT = +accessEnv("PORT", 3000);
    this.app.listen(PORT, () => {
      console.info(`GeoLocation Service listening on port:${PORT}`);
    });
  }

  private initializeMiddlewares(): void {
    // Parse application/json
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: IController[]): void {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }
}

export default App;
