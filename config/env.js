import { config } from "dotenv";

config(); //load environment variables

const CONFIG = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiry: process.env.JWT_EXPIRES_IN
    // nodeEnv: process.env.NODE_ENV || 'development',
};

export default CONFIG;