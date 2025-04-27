import mongoose from "mongoose";
import CONFIG from "../config/env.js";

if (!CONFIG.dbUri) {
    throw new Error("Database connection string not available")
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(CONFIG.dbUri);
        console.log("Database Connected Successfully")
    } catch (error) {
        console.error('Error connecting to database: ', error)
        process.exit(1); //it means failure

    }
}

export default connectToDatabase;