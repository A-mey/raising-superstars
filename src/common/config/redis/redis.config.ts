import { Redis } from "ioredis";
import redisMock from "ioredis-mock";

export class RedisService {

    redis: Redis;

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

    createNewHash = async (key: string, set: object) => {
        await this.redis.hset(key, set);
    }

    getDataFromHash = async (key: string, fields?: string[]) => {
        return await this.redis.hmget(key, ...fields!);
    }

    
}