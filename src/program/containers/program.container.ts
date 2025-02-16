import { Router } from "express";
import { ProgramController } from "../controllers/program.controller"
import { ProgramRoute } from "../routes/program.routes";
import { ContainerInterface } from "../../common/interfaces/container.interface";
import { ProgramService } from "../services/program.service";
import { ProgramDbDao } from "../dao/program.db.dao";

export class ProgramContainer implements ContainerInterface {

    programController: ProgramController;
    programRoute: ProgramRoute
    programService: ProgramService;
    programDbDao: ProgramDbDao;

    constructor () {
        this.programDbDao = new ProgramDbDao();
        this.programService = new ProgramService(this.programDbDao);
        this.programController = new ProgramController(this.programService);
        this.programRoute = new ProgramRoute(this.programController);
    }

    getRoute = (): Router  => {
        return this.programRoute.router;
    }
}