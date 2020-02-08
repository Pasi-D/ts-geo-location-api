import * as express from "express";

import GeolocationModule from "modules/GeolocationModule";

import { GeoCodeDTO } from "models/geolocation.dto";
import validationMiddleware from "middleware/validation.middleware";
import IController from "interfaces/controllers/controller.interface";

class GeolocationController implements IController {
  public path = "/api";
  public router = express.Router();

  public geolocationModule = new GeolocationModule();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/get_distance_and_time`, validationMiddleware(GeoCodeDTO), this.getDistanceTime);
  }

  private getDistanceTime = async (
    request: express.Request,
    respone: express.Response,
    next: express.NextFunction,
  ): Promise<any> => {
    const geolocationData: GeoCodeDTO = request.body;
    try {
      const results = await this.geolocationModule.getDistanceTime(geolocationData);
      respone.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };
}

export default GeolocationController;
