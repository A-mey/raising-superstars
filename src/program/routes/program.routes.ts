import express, { Router } from "express";
import { ProgramController } from "../controllers/program.controller";
import { RoutesInterface } from "../../common/interfaces/routes.interface";

export class ProgramRoute implements RoutesInterface {
    private name = "ProgramRoute";
    programController: ProgramController;
    router: Router;

    constructor (programController : ProgramController) {
        this.programController = programController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes () {
        this.router.route("/")
            .get(this.programController.getPrograms);

        // this.router.

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}