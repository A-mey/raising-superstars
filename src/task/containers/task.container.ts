import { Router } from "express";
import { TaskController } from "../controllers/task.controller"
import { TaskRoute } from "../routes/task.routes";
import { ContainerInterface } from "../../common/interfaces/container.interface";

export class TaskContainer implements ContainerInterface {

    taskController: TaskController;
    taskRoute: TaskRoute

    constructor () {
        this.taskController = new TaskController();
        this.taskRoute = new TaskRoute(this.taskController);
    }

    getRoute = (): Router  => {
        return this.taskRoute.router;
    }
}