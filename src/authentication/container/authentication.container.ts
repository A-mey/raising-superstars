import { MiddlewareContainerInterface } from "../../common/interfaces/middleware.container";
import { AuthenticationMiddleware } from "../middleware/authentication.middleware";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticationDbDao } from "../dao/authentication.db.dao";

export class AuthenticationContainer implements MiddlewareContainerInterface {

    authenticationMiddleware: AuthenticationMiddleware;
    authenticationService: AuthenticationService
    authenticationDbDao: AuthenticationDbDao;

    constructor () {
        this.authenticationDbDao = new AuthenticationDbDao();
        this.authenticationService = new AuthenticationService(this.authenticationDbDao);
        this.authenticationMiddleware = new AuthenticationMiddleware(this.authenticationService);
    }

    getMiddleware = ()  => {
        return this.authenticationMiddleware;
    }
}