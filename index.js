import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';

config(); //Load the variables from .env file

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json()); //Parse JSON bodies

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.get('/', (req, res) => {
    res.send("Welcome to my server. I am from browser")
})

app.listen(port, async () => {
    console.log(`Server is running on port http://localhost:${port}`);
    await connectToDatabase()
})

export default app;