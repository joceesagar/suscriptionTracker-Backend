import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        //Deduct 1 token from the bucket on each request
        const decision = await aj.protect(req, { requested: 1 }); //we are saying protect this request and tell me your decision(should it be denied or should it be let passed)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Rate Limit Exceeded" })
            }

            if (decision.reason.isBot()) {
                return res.status(429).json({ error: "Bot Detected" })
            }

            return res.status(429).json({ error: "Access Denied" })
        }

        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);

    }
}

export default arcjetMiddleware;