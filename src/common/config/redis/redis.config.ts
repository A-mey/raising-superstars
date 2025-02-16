import { Redis } from "ioredis";
import redisMock from "ioredis-mock";

class RedisConfig {

    private redis: Redis;
    private static instance: RedisConfig;

    constructor () {
        console.log(process.env.NODE_ENV, "env");
        if (!process.env.NODE_ENV) {
            this.redis = new redisMock();
        } else {
            this.redis = new Redis({
                port: 6379
            });
        } 
    }

    public static getInstance(): RedisConfig {
        if (!RedisConfig.instance) {
            RedisConfig.instance = new RedisConfig();
        }
        return RedisConfig.instance;
    }

    createNewHash = async (key: string, set: object) => {
        await this.redis.hset(key, set);
    }

    getDataFromHash = async (key: string, fields?: string[]) => {
        return await this.redis.hmget(key, ...fields!);
    }

    getAllDataFromHash = async (key: string) => {
        return await this.redis.hgetall(key);
    }
}

export default RedisConfig