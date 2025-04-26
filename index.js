import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

config(); //Load the variables from .env file

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json()); //Parse JSON bodies(Understand JSON payloads)
app.use(express.urlencoded({ extended: false })) //helps us to parse form data send by front end in simple form( Understand form submissions)
app.use(cookieParser()) //Parses cookies attached to the incoming request (from headers)(Understand cookies).

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware) //No error ----> Response sent back (errorMiddleware is skipped)   // Error occurs ----> during processing	Express jumps to error middleware.


app.get('/', (req, res) => {
    res.send("Welcome to my server. I am from browser")
})

app.listen(port, async () => {
    console.log(`Server is running on port http://localhost:${port}`);
    await connectToDatabase()
})

export default app;