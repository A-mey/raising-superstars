import RedisConfig from "../../common/config/redis/redis.config";
import { Program } from "../types/programs.type";

export interface ProgramCacheDaoInterface {
    redis: RedisConfig;
    storeProgramsInCache(userId: number, day: number, programs: Program[]): Promise<void>;
    getProgramsFromCache(userId: number, day: number): Promise<Program[]>;
}