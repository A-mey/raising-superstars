import express, { NextFunction } from "express";
import { ResponseHelper } from "../../common/helper/response.helper";
import { AuthenticationService } from "../services/authentication.service";
import { responseErrorMessage } from "../../common/helper/response.error.helper";

export class AuthenticationMiddleware {
    authenticationService: AuthenticationService;

    constructor (authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }
    authorizeToken = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                const response = ResponseHelper(false, "Token missing");
                res.status(400).json(response);
                return;
            }
            const token = this.authenticationService.getToken(bearerToken);
            if (!token) {
                const response = ResponseHelper(false, "Invalid token");
                res.status(400).json(response);
                return;
            }
            const userId = await this.authenticationService.authenticateToken(token);
            res.locals.userId = userId;
            next();
        } catch (error) {
            const errorMessage = responseErrorMessage(error as string);
            res.status(errorMessage.status).json(errorMessage.errorMessage);
        }
    }
}