import { Router } from "express";
import { ProgramController } from "../controllers/program.controller"
import { ProgramRoute } from "../routes/program.routes";
import { ContainerInterface } from "../../common/interfaces/container.interface";
import { ProgramService } from "../services/program.service";
import { ProgramDbDao } from "../dao/program.db.dao";
import { AuthenticationContainer } from "../../authentication/container/authentication.container";
import { AuthenticationMiddleware } from "../../authentication/middleware/authentication.middleware";

export class ProgramContainer implements ContainerInterface {

    private programController: ProgramController;
    private programRoute: ProgramRoute
    private programService: ProgramService;
    private programDbDao: ProgramDbDao;
    private authenticationMiddleware: AuthenticationMiddleware; 

    constructor () {
        this.programDbDao = new ProgramDbDao();
        this.programService = new ProgramService(this.programDbDao);
        this.programController = new ProgramController(this.programService);
        this.authenticationMiddleware = new AuthenticationContainer().getMiddleware();
        this.programRoute = new ProgramRoute(this.authenticationMiddleware, this.programController);
    }

    getRoute = (): Router  => {
        return this.programRoute.router;
    }
}