import RedisConfig from "../../common/config/redis/redis.config";
import { Program } from "../types/programs.type";

export interface ProgramCacheDaoInterface {
    redis: RedisConfig;
    storeProgramsInCache(userId: string, day: number, programs: Program[]): Promise<void>;
    getProgramsFromCache(userId: string, day: number): Promise<Program[]>;
}