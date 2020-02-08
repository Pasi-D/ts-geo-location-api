import "dotenv/config";
import App from "./app";
import GeolocationController from "controllers/Geolocation.controller";

const app = new App([new GeolocationController()]);

app.listen();
