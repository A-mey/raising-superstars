import { Jwt } from "../../common/config/jwt/jwt.config";
import { Catch } from "../../common/helper/catch.helper"
import { AuthenticationDbDao } from "../dao/authentication.db.dao";
import { AuthenticationServiceInterface } from "../interfaces/authentication.service.interface";

export class AuthenticationMockService implements AuthenticationServiceInterface {
    private authenticationDbDao: AuthenticationDbDao;
    constructor (authenticationDbDao: AuthenticationDbDao) {
        this.authenticationDbDao = authenticationDbDao;
    }

    getToken = (bearerToken: string): string => {
        try {
            return bearerToken.split(" ")[1];
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    authenticateToken = async (token: string): Promise<string> => {
        try {
            const userId = this.getUserId(token);
            await this.checkWhetherUserExists(userId);
            return userId;
        } catch (error) {
            throw new Error(Catch(error))
        }
    }

    getUserId = (token: string) => {
        try {
            const userIdData = Jwt.getTokenData<{userId: string}>(token);
            if (!userIdData || !userIdData.userId) {
                throw new Error("401, authentication error");
            }
            return userIdData.userId;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    checkWhetherUserExists = async (userId: string): Promise<void> => {
        try {
            const userData = await this.authenticationDbDao.getUserById(userId);
            if (!userData) {
                throw new Error("404, authentication error");
            }
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}