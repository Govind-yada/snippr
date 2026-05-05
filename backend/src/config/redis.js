const { createClient } = require("redis");

let redisClient;

const connectRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  });

  redisClient.on("error", (err) =>
    console.error("Redis Client Error", err)
  );

  try {
    await redisClient.connect();
    console.log("Redis Connected ✅");
  } catch (err) {
    console.error("Redis connection failed:", err.message);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };