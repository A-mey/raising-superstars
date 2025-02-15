import express from "express";
import { HealthContainer } from "../../health/containers/health.container";
import { RoutesInterface } from "../interfaces/routes.interface";
import { TaskContainer } from "../../task/containers/task.container";

export default class Dependency {
    routes: Array<RoutesInterface> = [];
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }
    getRoutes = () => {
        this.app.use("/backend/v1/raising-superstar/health", new HealthContainer().getRoute());
        this.app.use("/backend/v1/raising-superstar/tasks", new TaskContainer().getRoute());
    }
}