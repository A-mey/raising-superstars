import express, { Router } from "express";
import { HealthController } from "../controllers/health.controller"
import { HealthRoute } from "../routes/health.routes";
import { ContainerInterface } from "../../common/interfaces/container.interface";

export class HealthContainer implements ContainerInterface {

    healthController: HealthController;
    healthRoutes: HealthRoute

    constructor () {
        this.healthController = new HealthController();
        this.healthRoutes = new HealthRoute(this.healthController);
    }

    getRoute = (): Router  => {
        return this.healthRoutes.router;
    }
}