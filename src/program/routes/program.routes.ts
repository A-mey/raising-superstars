import express, { Router } from "express";
import { ProgramController } from "../controllers/program.controller";
import { RoutesInterface } from "../../common/interfaces/routes.interface";
import { AuthenticationMiddleware } from "../../authentication/middleware/authentication.middleware";
import { ProgramMiddleware } from "../middleware/program.middleware";

export class ProgramRoute implements RoutesInterface {
    private name = "ProgramRoute";
    private programController: ProgramController;
    router: Router;
    private authenticationMiddleware: AuthenticationMiddleware;
    private programMiddleware: ProgramMiddleware;

    constructor (authenticationMiddleware: AuthenticationMiddleware, programMiddleware: ProgramMiddleware, programController : ProgramController) {
        this.authenticationMiddleware = authenticationMiddleware;
        this.programMiddleware = programMiddleware;
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
                this.programMiddleware.verifyProgramId,
                this.programController.updateProgramCompletion
            )

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}