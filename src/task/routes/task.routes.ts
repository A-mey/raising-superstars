import express, { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { RoutesInterface } from "../../common/interfaces/routes.interface";

export class TaskRoute implements RoutesInterface {
    private name = "ProductRoute";
    taskController: TaskController;
    router: Router;

    constructor (taskController : TaskController) {
        this.taskController = taskController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes () {
        this.router.route("/")
            .get(this.taskController.getTasks);

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}