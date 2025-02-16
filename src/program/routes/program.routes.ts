import express, { Router } from "express";
import { ProgramController } from "../controllers/program.controller";
import { RoutesInterface } from "../../common/interfaces/routes.interface";
import { AuthenticationMiddleware } from "../../authentication/middleware/authentication.middleware";

export class ProgramRoute implements RoutesInterface {
    private name = "ProgramRoute";
    programController: ProgramController;
    router: Router;
    authenticationMiddleware: AuthenticationMiddleware;

    constructor (authenticationMiddleware: AuthenticationMiddleware, programController : ProgramController) {
        this.authenticationMiddleware = authenticationMiddleware;
        this.programController = programController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes () {
        this.router.route("/")
            .get(
                this.authenticationMiddleware.authorizeToken,
                this.programController.getPrograms
            );

        this.router.route("/completion")
            .patch(
                this.authenticationMiddleware.authorizeToken,
                this.programController.updateProgramCompletion
            )

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}