import mongoose from "mongoose";
import { config } from "dotenv";

config(); //load env variables

const db_uri = process.env.DB_URI;

if (!db_uri) {
    throw new Error("Database connection string not available")
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(db_uri);
        console.log("Database Connected Successfully")
    } catch (error) {
        console.error('Error connecting to database: ', error)
        process.exit(1); //it means failure

    }
}

export default connectToDatabase;