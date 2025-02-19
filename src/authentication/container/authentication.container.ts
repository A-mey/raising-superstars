import { MiddlewareContainerInterface } from "../../common/interfaces/middleware.container.interface";
import { AuthenticationMiddleware } from "../middleware/authentication.middleware";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticationDbDao } from "../dao/authentication.db.dao";
import { AuthenticationMockService } from "../services/authentication.mock.service";
import { AuthenticationServiceInterface } from "../interfaces/authentication.service.interface";

export class AuthenticationContainer implements MiddlewareContainerInterface<AuthenticationMiddleware> {

    private authenticationMiddleware: AuthenticationMiddleware;
    private authenticationService: AuthenticationService
    private authenticationDbDao: AuthenticationDbDao;
    private authenticationServiceMock: AuthenticationMockService;

    constructor () {
        this.authenticationDbDao = new AuthenticationDbDao();
        this.authenticationService = new AuthenticationService(this.authenticationDbDao);
        this.authenticationServiceMock = new AuthenticationMockService(this.authenticationDbDao);
        this.authenticationMiddleware = new AuthenticationMiddleware(this.authenticationService);
    }

    getMiddleware = (): AuthenticationMiddleware  => {
        return this.authenticationMiddleware;
    }

    getMockService = (): AuthenticationServiceInterface => {
        return this.authenticationServiceMock;
    }
}