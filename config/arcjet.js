import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import CONFIG from "./env.js";

const aj = arcjet({
    key: CONFIG.arcjet_key,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                //"CATEGORY:MONITOR", // Uptime monitoring services
                //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
                "POSTMAN" //for testing
            ],
        }),
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10, // Bucket capacity of 10 tokens
        }),
    ],
});

export default aj;

//TOKEN BUCKET ALGORITHM (from documentation)
// A user can make 10 continuous request as bucket has capacity of 10 tokens and each request deduct 1 token. And when the token is empty user is blocked for 
// certain time until the token is refill. And refill rate is 5 means in every 10sec 5 tokens are added to bucket if bucket has space.