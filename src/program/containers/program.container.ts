import { Router } from "express";
import { ProgramController } from "../controllers/program.controller"
import { ProgramRoute } from "../routes/program.routes";
import { ContainerInterface } from "../../common/interfaces/container.interface";
import { ProgramService } from "../services/program.service";
import { ProgramDbDao } from "../dao/program.db.dao";
import { AuthenticationContainer } from "../../authentication/container/authentication.container";
import { AuthenticationMiddleware } from "../../authentication/middleware/authentication.middleware";
import { ProgramCacheDao } from "../dao/program.cache.dao";
import { ProgramCacheMockDao } from "../dao/program.cache.mock.dao";
import { ProgramDbMockDao } from "../dao/program.db.mock.dao";
import { ProgramMiddleware } from "../middleware/program.middleware";

export class ProgramContainer implements ContainerInterface {

    private programController: ProgramController;
    private programRoute: ProgramRoute
    private programService: ProgramService;
    private programDbDao: ProgramDbDao;
    private authenticationMiddleware: AuthenticationMiddleware; 
    private programCacheDao: ProgramCacheDao;
    private programCacheDaoMock: ProgramCacheMockDao;
    private programDbDaoMock: ProgramDbMockDao;
    private programServiceMock: ProgramService;
    programMiddleware: ProgramMiddleware;

    constructor () {
        this.programDbDao = new ProgramDbDao();
        this.programCacheDao = new ProgramCacheDao();

        this.programCacheDaoMock = new ProgramCacheMockDao();
        this.programDbDaoMock = new ProgramDbMockDao();

        this.programServiceMock = new ProgramService(this.programDbDaoMock, this.programCacheDaoMock);


        this.programService = new ProgramService(this.programDbDao, this.programCacheDao);
        this.programController = new ProgramController(this.programService);

        this.authenticationMiddleware = new AuthenticationContainer().getMiddleware();

        this.programMiddleware = new ProgramMiddleware(this.programService);

        this.programRoute = new ProgramRoute(this.authenticationMiddleware, this.programMiddleware, this.programController);
    }

    getRoute = (): Router  => {
        return this.programRoute.router;
    }

    getMockService = () => {
        return this.programServiceMock
    }

}