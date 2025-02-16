import { Catch } from "../../common/helper/catch.helper"
import User from "../../common/models/users.model";

export class AuthenticationDbDao {
    constructor () {}

    getUserById = async (userId: string): Promise<User | null> => {
        try {
            const userData = await User.findOne({
                where: {id: userId}
            })
            return userData;
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}