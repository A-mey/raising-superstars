import RedisConfig from "../../common/config/redis/redis.config";
import { ProgramCacheDaoInterface } from "../interfaces/program.cache.dao.interface";
import { Program } from "../types/programs.type";

export class ProgramCacheMockDao implements ProgramCacheDaoInterface {
    redis: RedisConfig = RedisConfig.getInstance()
    storeProgramsInCache(userId: string, day: number, programs: Program[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getProgramsFromCache(userId: string, day: number): Promise<Program[]> {
        throw new Error("Method not implemented.");
    }
    
} 