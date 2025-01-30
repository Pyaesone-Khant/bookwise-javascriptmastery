import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(5, "1m"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});