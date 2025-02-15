import express, { Router } from "express";
import { HealthController } from "../controllers/health.controller";
import { RoutesInterface } from "../../common/interfaces/routes.interface";

export class HealthRoute implements RoutesInterface {
    private name = "ProductRoute";
    healthController: HealthController;
    router: Router;

    constructor (healthController : HealthController) {
        this.healthController = healthController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes () {
        this.router.route("/")
            .get(this.healthController.checkHealth);

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}