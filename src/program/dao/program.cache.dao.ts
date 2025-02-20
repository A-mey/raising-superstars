import { Catch } from "../../common/helper/catch.helper"
import { Program } from "../types/programs.type";
import RedisConfig from "../../common/config/redis/redis.config"
import { ProgramCacheDaoInterface } from "../interfaces/program.cache.dao.interface";

export class ProgramCacheDao implements ProgramCacheDaoInterface {
    redis: RedisConfig;
    constructor () {
        this.redis = RedisConfig.getInstance();
    }

    getProgramsFromCache = async (userId: string, day: number) : Promise<Program[]> => {
        try {
            const data = await this.redis.getDataFromHash(`${userId}_${day}`, ["programs"]);

            if (!data || !data[0]) return [];

            return JSON.parse(data[0]) as Program[];
        } catch (error) {
            throw new Error(Catch(error));
        }
    }

    storeProgramsInCache = async (userId: string, day: number, programs: Program[]): Promise<void> => {
        try {
            const data = { userId: userId, day: day, programs: JSON.stringify(programs) }
            const key = `${userId}_${day}`;
            await this.redis.createNewHash(key, data);
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}