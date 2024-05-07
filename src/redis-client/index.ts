import { RedisClientType, createClient } from "redis";

const redisClient: RedisClientType = createClient();

export default redisClient;
