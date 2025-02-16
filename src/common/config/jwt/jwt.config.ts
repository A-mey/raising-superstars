import jwt from "jsonwebtoken";
import { Catch } from "../../helper/catch.helper";

export class Jwt {
    private static secretKey: string = process.env.SECRET_KEY || (() => { process.exit(1); return ""; })();
    private constructor () {
        
    }

    static getTokenData = <T>(token: string): T => {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded as T;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}