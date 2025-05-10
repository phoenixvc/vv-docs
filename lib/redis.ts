import { Redis } from "@upstash/redis"

// Initialize Redis client with connection details from environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.REDIS_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
})

// Test connection function
export async function testRedisConnection(): Promise<boolean> {
  try {
    await redis.ping()
    console.log("Redis connection successful")
    return true
  } catch (error) {
    console.error("Redis connection failed:", error)
    return false
  }
}

export default redis
